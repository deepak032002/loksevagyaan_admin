import React, { useState, useRef, useLayoutEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import "./editor.scss";

const MyEditor = () => {
  const [value, setValue] = useState("");

  const handleCreateTOC = (html) => {
    const headings = html.querySelectorAll("h2, h3, h4, h5, h6");

    const toc = document.createElement("ul");
    toc.classList.add("toc");

    headings.forEach((heading) => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.innerText = heading.innerText;
      a.href = `#${heading.id}`;
      li.appendChild(a);
      toc.appendChild(li);
    });

    console.log(toc);
  };

  const handleSave = () => {
    // Find all headings elements
    const html = new DOMParser().parseFromString(value, "text/html");
    const headings = html.querySelectorAll("h2, h3, h4, h5, h6");

    // add id to each heading and replace with new element
    headings.forEach((heading) => {
      const id = Math.random().toString(36).substr(2, 9);
      heading.id = id;
      heading.outerHTML = heading.outerHTML;
    });
    console.log(html);
    handleCreateTOC(html);
  };

  return (
    <div className="editor">
      <CKEditor
        editor={Editor}
        data={value}
        onReady={(editor) => {
          console.log("Editor is ready to use!");
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(data);
        }}
        config={{
          simpleUpload: {
            uploadUrl: "http://localhost:1337/upload",
          },
        }}
      />

      <button
        className="bg-[#00ccff] p-2 rounded hover:bg-[#00ccee] text-white my-2"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default React.memo(MyEditor);
