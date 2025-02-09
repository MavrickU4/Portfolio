import Users from '../models/user.js';
import { UserDisplayName, UserID, mobileCheck } from '../utils/index.js';


//displays page to add new item to database
export function displayAdminDashboardPage(req, res, next){
    res.render('index', { title: 'Admin', page: 'admin/admin-dashboard', ad: {}, userID: UserID(req), displayName: UserDisplayName(req),
mobile: mobileCheck(req), successMessage: req.flash('successMessage'), errorMessage: req.flash('errorMessage'),
orders: [], ordersUnfulfilled: [],

});
}


