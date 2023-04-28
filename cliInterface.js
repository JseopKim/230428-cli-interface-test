import inquirer from "inquirer";
import fs from "fs";

function createFile(filetitle, contents) {
  fs.writeFile(`./result/${filetitle}.html`, contents, function(error) {
    if(error === null) {
      console.log('성공');
    } else {
      console.log('실패');
    }
  })
}

function makeHTML(title, data) {
  let htmlBox = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
  ${data}
</body>
</html>
    `;

  return htmlBox;
}

function makeDiv(yesOrNo, detail) {
  if(yesOrNo === 'yes') {
    return `<div id='root'><p>${detail}</p></div>`;
  } else if(yesOrNo === 'no') {
    return `<p>${detail}</p>`;
  }
}



inquirer
  .prompt([
    {
      type: "input",
      name: "fileName",
      message: "파일명을 입력하세요.",
    },
    {
      type: "input",
      name: "titleTag",
      message: "title태그에 들어갈 내용을 입력하세요.",
    },
    {
      type: "list",
      name: "correctRootDiv",
      message:
        "body 태그의 자식으로, 최상위 태그인 #root div를 만드시겠습니까?",
      choices: ["yes", "no"],
    },
    {
      type: "input",
      name: "detail",
      message: "본문을 작성하세요.",
    },
    {
      type: "confirm",
      name: "confirm",
      message: "제출하시겠습니까?",
    },
  ])
  .then((answers) => {
    createFile(answers['fileName'], makeHTML(answers['titleTag'], makeDiv(answers["correctRootDiv"], answers['detail'])));
  });
