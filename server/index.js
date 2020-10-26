// because of babel so, we can use import 
import express from "express";
import React from "react";
/** revise using renderToNodeStream instead of renderToString */
// renderToString will sending payload all at once
// renderToNodeStream will render in a little peiece, progressive loading
// import { renderToString } from "react-dom/server";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

// read the output html where is config in package.json --> "build"
// so we can use this on server side rendering
const html = fs.readFileSync("dist/index.html").toString();

// refer to index.html, split into an array of 2 parts 
//where before the textContents of <div id="root">
// and after the textContents
const parts = html.split("not rendered");

// start express server
const app = express();

// statically server everything in dist directory 
app.use("/dist", express.static("dist"));

// =====================================//
/** APPROCH WITH USING renderToString **/
// =====================================//
// give a middleware that runs everytime it gets requested
// app.use((req, res) => {
//   const reactMarkup = (
//     <ServerLocation url={req.url}>
//       <App />
//     </ServerLocation>
//   );
  
//   // ---- part[0] + reactMarkup + part[1]---//
//   res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
//   res.end();
// });

// =====================================//
/** APPROCH WITH USING renderToNodeStream **/
// =====================================//
app.use((req, res) => {
  /** PART ONE */
  res.write(parts[0]);
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );
  
  /** PART reactMarkup */
  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  
  /** PART TWO */
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log(`listening on ${PORT}`);
app.listen(PORT);