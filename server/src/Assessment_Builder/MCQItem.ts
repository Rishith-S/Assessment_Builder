import { QuesitonType } from "../models/FIB_Schema";
import MCQ from "../models/MCQ_Schema"; 

export class MCQItem {
    private question: QuesitonType[];
    private options: QuesitonType[];
    private answers: QuesitonType[];
    private time: string;
    private tag?: string;

    constructor(
        question: QuesitonType[],
        options: QuesitonType[],
        answers: QuesitonType[],
        time: string,
        tag?: string
    ) {
        this.question = question;
        this.answers = answers;
        this.options = options;
        this.time = time;
        this.tag = tag ?? "";
    }

    async create() {
        const mcq = await MCQ.create({
            question: this.question,
            options: this.options,
            answers: this.answers,
            time: this.time,
            tag: this.tag ?? ""
        });
        return String(mcq._id);
    }

    evaluate(studentAnswer: QuesitonType[], weightage: string): number {
        const weight = Number(weightage);
        if (isNaN(weight)) {
            throw new Error("Invalid weightage value");
        }
        for (const ans of this.answers) {
            if (ans.contentType === "string") {
                const matchingAnswer = studentAnswer.find(studAns => studAns.contentType === "string" && studAns.key === ans.key);
                if (!matchingAnswer) {
                    return 0;
                }
            }
        }
        return weight;
    }
}
