import { Request, Response, NextFunction } from 'express';
import { readFileSync, writeFile } from 'fs';

// reading from the file
const readFromFile = async (req: Request, res: Response, next: NextFunction) => {
    const fileStr = '[' + readFileSync('./Contact-Info.txt', 'utf-8') + ']';
    const jsonObj = JSON.parse(fileStr);

    return res.status(200).json({
        message: jsonObj
    });
};

// adding to file
const writeToFile = async (req: Request, res: Response, next: NextFunction) => {
    
    // get the data from req
    let body: Object = req.body;
    if (body === {} ) {
        return res.status(400).json({
            message: body
        });
    }

    const fileStr = readFileSync('./Contact-Info.txt', 'utf-8');

    var content: string;

    if (fileStr === '') {
        content= JSON.stringify(body)
    }
    else {
        content= ',\n' + JSON.stringify(body) 
    }

    writeFile('Contact-Info.txt', content, { flag: 'a+' }, (err: any) => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    })

    // return response
    return res.status(200).json({
        message: body
    });
};

export default { readFromFile, writeToFile };