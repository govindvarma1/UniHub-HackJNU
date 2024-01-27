import University from "../models/University.js"

export const getAllUniversities = async (req, res, next) => {
    try {
        const universities = await University.find();
        res.status(200).json(universities);
    } catch (ex) {
        next(ex);
    }
}

export const getSingleUniversity=async(req,res,next)=>{
    try {
        const universityId = req.params.universityId;

        // Check if the provided universityId exists in the database
        const university = await University.findById(universityId)
            .populate({
                path: 'projects',
                match: { status: 'approved' }, // Only include approved projects
                populate: {
                    path: 'readmeFile',
                },
            })
            .populate('admin professors students');

        if (!university) {
            return res.status(404).json({ error: 'University not found.' });
        }

        res.status(200).json({ university });
    } catch (ex) {
        next(ex);
    }
}