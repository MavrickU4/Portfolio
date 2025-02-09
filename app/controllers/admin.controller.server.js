import Users from '../models/user.js';
import { UserDisplayName, UserID } from '../utils/index.js';


//displays page to add new item to database
export function displayAdminDashboardPage(req, res, next){
    res.render('index', { title: 'Add Ad', page: 'admin/admin-dashboard', ad: {}, userID: UserID(req), displayName: UserDisplayName(req) });
}


