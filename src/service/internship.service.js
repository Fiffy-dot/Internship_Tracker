import InternshipModel from "../models/internship.js";

class Internship {
    
    static async findAllInternship() {
        try {
            const data = await InternshipModel.find({});
            return data;
        } catch(error) {
            throw error
        }
    }

}

export default Internship;