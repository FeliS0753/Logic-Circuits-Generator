import express from "express";
const home = express();

home.use(express.static("public"));
home.use(express.json());

home.get('/', (req, res) => {
    res.render("hello.ejs");
});

import {toRpn} from "./rpn.js";
import {locate} from "./locate.js";

home.use(express.urlencoded({ extended: true }));

home.post("/send", (req, res) => {
    const str = toRpn(req.body.str);
    if(Number.isNaN(str - 0)){
        res.json(locate(str));
    }else{
        //入力不正を返す
        res.json({ error: str });
    }
});

home.listen(3000);