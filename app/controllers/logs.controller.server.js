/*
File:
*/

import logsModel from '../models/logs.js';

// import DisplayName and UserID Utility method
import { UserDisplayName, UserID} from '../utils/index.js';


//gets all ad's in database
export function LogsAdList(req, res, next){
    logsModel.find(function(err, logsCollection) {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.render('index', {title: 'Logs List', page: 'logs', logs: logsCollection, userID: UserID(req), user: req.user, displayName: UserDisplayName(req)});
    })
}

