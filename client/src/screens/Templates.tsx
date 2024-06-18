import { useEffect, useState } from "react"
import axios from "../api/axios";
import viewIcon from "../assets/icons/viewIcon.svg"
import editIcon from "../assets/icons/editIcon.svg"
import deleteIcon from "../assets/icons/deleteIcon.svg"
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/Modals/CofirmationModal";

export default function Templates() {

    const [templates,setTemplates] = useState<{_id:string,type:string}[]>([]);
    const [loading,setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const navigate = useNavigate()
    useEffect(()=>{

        const getTemplates = async ()=>{
            try {
                const res = await axios.get('/all-templates');
                setTemplates(res.data.templates);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getTemplates();
    },[axios])

   
    const handleDeleteTemplate = async (id: string) => {
      try {
        const res = await axios.delete(`/template/${id}`);
        // console.log(res);
        // Remove the deleted template from the state
        setTemplates(templates.filter(template => template._id !== id));
      } catch (error) {
        console.log(error);
      } finally {
        setShowModal(false);
        setDeleteId(null);
      }
    }

    const confirmDelete = (id: string) => {
      setDeleteId(id);
      setShowModal(true);
    }
  

  return (
    <div className="px-16">
      {
        loading ? <div className="flex items-center">
          loading
        </div> : null
      }
      <div className="flex justify-between mb-4 bg-neutral-300 rounded-lg p-10">
        <div className="flex items-center font-bold text-xl">Templates</div>
        <div onClick={()=>{navigate("/create-template")}} className="cursor-pointer bg-primary-500 text-neutral-100 font-bold h-10 flex items-center px-4 rounded-lg">+ Create Templates</div>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 p-8">
      {
        templates && templates.map((template)=>(
          <div key={template._id} className="flex justify-between rounded-lg gap-4 border p-2">
            <div className="flex items-center text-lg font-bold">{template!.type}</div>
            
            <div>
              <div className="flex gap-2 cursor-pointer font-semibold items-start" onClick={()=>{
                navigate(`/view-template/${template._id}`)
              }}><img className="w-7 h-5" src={viewIcon}/><span className="flex items-start">view</span></div>
              <div className="flex gap-2 cursor-pointer font-semibold"><img className="w-7 h-5" src={editIcon}/><span>edit</span></div>
              <div className="flex gap-2 cursor-pointer font-semibold"><img className="w-7 h-5" src={deleteIcon} /><span className="text-error-800" onClick={() => { confirmDelete(template._id) }}> delete</span></div>
              
            </div>
          </div>
        ))
      }
      </div>


<ConfirmationModal
                      show={showModal}
                      onClose={() => setShowModal(false)}
                      onConfirm={() => deleteId && handleDeleteTemplate(deleteId)}
                      title="Confirm Delete"
                      message="Are you sure you want to delete this template?"
                      caution="Caution : Deleting this template will delete all assessments built on this template."
                  />
    </div>
  )
}
