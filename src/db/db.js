import mongoose from 'mongoose';

export const connectToDb = () => {
    const promise = new Promise(async (resolve, reject) => {
        // connect to mongodb
        try {
            await mongoose.connect("mongodb+srv://internshiptracker:internshiptracker@cluster0.6cip6.mongodb.net/platformDb?retryWrites=true&w=majority")
            resolve(true);
        } catch(error) {
            console.log(error);
            reject(error);
        }
    })

    return promise;
}