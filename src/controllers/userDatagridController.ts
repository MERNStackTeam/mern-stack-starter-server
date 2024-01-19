import User from '../models/User';
// For Data grid
export const getUsers = async (req: any, res: any) => {
    try {
        const page = parseInt(req.query._page) || 1;
        const limit = parseInt(req.query._limit) || 5;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .skip(skip)
            .limit(limit);

        res.json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};