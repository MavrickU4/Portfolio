/*
File: 
*/

import adModel from "../../models/ad.js";

export function GetList(req, res, next){
    adModel.find((err, adCollection)=>{
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({success: true, msg: 'Success', ad: adCollection, user: req.user})
    });
}

export function Get(req, res, next){
    let id = req.params.id;

    adModel.findById(id, (err, ad) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({success: true, msg: 'Success', ad, user: req.user })
    });
}

export function Add(req, res, next){
    let newad = new adModel({
        ...req.body
    });

    adModel.create(newad, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({success: true, msg: 'Success', newad});
    })
}

export function Edit(req, res, next){
    let id = req.params.id;

    let updatedad = new adModel({
        "_id": id,
        ...req.body
    });

    adModel.updateOne({_id: id}, updatedad, (err) => {
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({success: true, msg: 'Success', updatedMovie });
    })
}

export function Delete(req, res, next){
    let id = req.params.id;

    adModel.remove({_id: id}, (err)=>{
        if(err){
            console.error(err);
            res.end(err);
        }

        res.json({success: true, msg: 'Success'})
    })
} 