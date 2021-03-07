'use strict';

import {NextFunction, Request, Response} from "express";
import ErrnoException = NodeJS.ErrnoException;

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

interface PageTitleAndDescription {
    title: string;
    description: string;
}

interface routeToPageAndDescriptionMapping {
    [path: string]: PageTitleAndDescription;
}

const pageTitlesAndDescriptions: routeToPageAndDescriptionMapping = {
    '/': {title: 'Home page', description: 'This is the home page.'},
    '/news': {title: 'News page', description: 'This is the news page.'},
    '/about': {title: 'About page', description: 'This is the about page.'}
};

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req: Request, res: Response, next: NextFunction) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
        console.log('Hoi');
    } else {
        const filePath = path.resolve(__dirname, 'build', 'index.html')
        fs.readFile(filePath, 'utf8', (err: ErrnoException | null, data: string) => {
            let title = pageTitlesAndDescriptions[req.path]?.title || 'Page not found';
            let description = pageTitlesAndDescriptions[req.path]?.description || 'This is the page not found page.';

            data = data.replace(/\$OG_TITLE/g, title);
            data = data.replace(/\$OG_DESCRIPTION/g, description);

            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.send(data);
        });
    }
});

app.use(express.static(path.join(__dirname, 'build')));

// Start the server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
