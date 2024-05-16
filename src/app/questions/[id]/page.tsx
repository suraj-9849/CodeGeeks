"use client"

import Navbar from "@/app/navbar/page";
import Editor from "@monaco-editor/react"
import axios from "axios";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
import {useEffect, useState } from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function IDE({params} : any) {
    interface example {
      input : string,
      output : string,
      explanation : string
    }

    interface snippet {
      fcode : string,
      lcode : string,
    }

    const themeNames = [
        "vs-dark",
        "vs-light",
    ];

    const language = [
      {
        name : "cpp",
        defaultSyntax : 
        "#include<iostream>\nusing namespace std;\nint main(){\n\t#ifndef ONLINE_JUDGE\n\t\tfreopen(\"input.txt\" , \"r\" , stdin);\n\t#endif\n\tcout << \"Hello world\" << endl;\n\treturn 0;\n}"
      },
      {
        name : "python",
        defaultSyntax : "print('Hello world')"
      },
      {
        name : "java",
        defaultSyntax : "public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println('Hello world');\n\t}\n}"
      },
      {
        name : "javascript",
        defaultSyntax : "console.log('Hello world')"
      }
    ]; 

    const [theme , setTheme] = useState("vs-dark");
    const [lang , setLanguage] = useState({
      name : "cpp",
      defaultSyntax : ""
    });

    const [snippets , setSnippets] = useState<snippet>();
    const [editorHeight, setEditorHeight] = useState("60vh");
    const [editorOptions, setEditorOptions] = useState({
      fontSize: 18, 
    });
    const [UserInput, setUserInput] = useState("");
    const [Output, setOutput] = useState("");

    const handleSubmit = async (e : any) => {
        try {
            e.preventDefault();
            setOutput("Executing...");
            const totalCode = snippets?.fcode + lang.defaultSyntax + snippets?.lcode;
            const reqBody = {
                code : totalCode,
                input : UserInput,
                output : Output,
                expectedOutput : "",
                lang : lang.name,
                timeLimit : 5,
                memoryLimit : 256,
            }
            console.log("hello" , totalCode);
            const response =  await axios.post("/api/editor/codeExec" , reqBody);
            if(response.data.status === 200){
              setOutput(response.data.data.output);
            }
        } catch (error : any) {
            console.log("Error submitting code", error);
        }
    };


    console.log(lang.defaultSyntax)
    console.log("default " , language[0].defaultSyntax)

    const handleRun = async (e : any) => {
        e.preventDefault();
    }

    const [question , setQuestion] = useState({
      pid : "",
      pName : "",
      pDesc : "",
      pDifficulty : "",
      pCode : "",
      constraints : [],
    });
    const [examples , setExamples] = useState<example []>();

    useEffect(() => {
      axios.get(`/api/problems/getSpecificProblem?pid=${params.id}`).then(res => {
        const backendString = res.data.data.problem.pCode;
        const formattedString2 = backendString.replace(/\\n/g, '\n');
        const formattedString = formattedString2.replace(/\\t/g, '\t');
        const tsc = res.data.data.problem.inpurTC;
        const tscFormatted1 = tsc.replace(/\\n/g, '\n');
        const tscFormatted2 = tscFormatted1.replace(/\\t/g, '\t');
        const tscFormatted = tscFormatted2.replace(/ /g, '');
        const firstCode = res.data.data.problem.fcode;
        const firstFormat1 = firstCode.replace(/\\n/g, '\n');
        const firstFormat = firstFormat1.replace(/\\t/g, '\t');
        const lastCode = res.data.data.problem.lcode;
        const lastFormat1 = lastCode.replace(/\\n/g, '\n');
        const lastFormat = lastFormat1.replace(/\\t/g, '\t');
        setQuestion({
          pid : res.data.data.problem.pid,
          pName : res.data.data.problem.pName,
          pDesc : res.data.data.problem.pDesc,
          pDifficulty : res.data.data.problem.pDifficulty,
          pCode : formattedString,
          constraints : res.data.data.problem.constraints
        });
        setSnippets({
          fcode : firstFormat,
          lcode : lastFormat
        });
        setExamples(res.data.data.examples);
        setUserInput(tscFormatted);
        setLanguage({...lang , defaultSyntax : formattedString})
      }).catch(err => {
        console.log(err)
      })
    },[params.id]);

    return (
      <>
        <Navbar />
        <ResizablePanelGroup
        direction="horizontal"
        className="max-w-screen rounded-lg border"
       >
        <div className="flex items-start h-screen" style={{
          paddingTop : "3.6rem"
        }} >
         {/* block to have question name description examples as on question with constraints */}
         <ResizablePanel defaultSize={60}>
         <div className="bg-white border border-gray-300 rounded-md shadow-md p-6 pb-28" style={{ height: '100vh', overflow: 'scroll' }}>
            <div className="text-2xl font-bold mb-2">{question.pid}.{question.pName}</div>
            <div className="text-base font-semibold mb-1" style={{
              color : `${question.pDifficulty === "Easy" ? "green" : question.pDifficulty === "Medium" ? "orange" : "red"}`
            }}>{question.pDifficulty}</div>
            <div className="mb-4">
                <div className="text-base font-semibold mb-2">Description</div>
                <div className="text-md text-gray-800">{question.pDesc}</div>
            </div>

            {
              examples?.map((item , index) => (
                <div key={index} className="mb-4">
                  <div className="text-base font-semibold mb-2">Example {index + 1}</div>
                  <div className="text-md text-gray-800"><span className="text-md text-gray-800 font-semibold">Input : </span>{item.input}</div>
                  <div className="text-md text-gray-800"><span className="text-md text-gray-800 font-semibold">Output : </span>{item.output}</div>
                  <div className="text-md text-gray-800"><span className="text-md text-gray-800 font-semibold">Description : </span>{item.explanation}</div>
              </div>
               ))
            }
            <div>
                <div className="text-base font-semibold mb-2">Constraints</div>
                <div className="text-md text-gray-800">{question.constraints}</div>
            </div>
        </div>

        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel defaultSize={100}>
      <div className="p-4 border pb-28" style={{
            width : "100%",
            height : "100vh",
            overflow : "scroll"
        }} >
        {/* Dropdown for theme */}
          <div className="flex justify-between">
              <div>
              <Dropdown>
              <DropdownTrigger >
                  <Button className={`text-base font-semibold mb-2 ml-3 ${theme === "vs-dark" ? "text-black" : "text-black"}`}
                  variant="bordered" 
                  >
                  {theme}
                  </Button>
              </DropdownTrigger>
              <DropdownMenu className={`text-base font-semibold mb-2 ${theme === "vs-dark" ? "text-white" : "text-black"}`}
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={theme}
                  onSelectionChange={(e : any) => setTheme(e)}
              >
                  {
                      themeNames.map((item , index) => (
                          <DropdownItem key={item} onClick={() => {
                              setTheme(item);
                          }}>{item}</DropdownItem>
                      ))
                  }
              </DropdownMenu>
          </Dropdown>
              </div>
            <div >
              <Dropdown >
                  <DropdownTrigger >
                      <Button className={`text-base font-semibold mb-2 ${theme === "vs-dark" ? "text-black" : "text-black"}`}
                      variant="bordered" 
                      >
                      {lang.name}
                      </Button>
                  </DropdownTrigger>
                  <DropdownMenu className={`text-base font-semibold mb-2 ${theme === "vs-dark" ? "text-white" : "text-black"}`}
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys = {lang.name}
                      onSelectionChange={(selectedLanguage : any) => {
                        setLanguage(selectedLanguage);
                      }}
                  >
                      {
                          language.map((item) => (
                              <DropdownItem key={item.name} onClick={(e : any) => {
                                  e.preventDefault();
                                  setLanguage(item);
                              }}>{item.name}</DropdownItem>
                          ))
                      }
                  </DropdownMenu>
              </Dropdown>
            </div>
        </div>

         {/* Dropdown for language */}
          <form action="#" >
            <div className="text-xl">
              <label htmlFor="comment" className="sr-only">
                Add your code
              </label>
              <Editor
                height={editorHeight}
                theme={theme}
                defaultLanguage={lang.name}
                defaultValue = {lang.defaultSyntax}
                value= {lang.defaultSyntax}
                options={editorOptions}
                onChange={(value : any) => {
                  setLanguage({
                    ...lang,
                    defaultSyntax : value
                  });
                }}
              />
            </div>
            <div className="flex justify-between pt-2">
              <div className="flex items-center space-x-5"></div>
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 mx-2 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                  onClick={handleRun}
                >
                  Run
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500"
                  onClick={handleSubmit}
                >
                  submit
                </button>
              </div>
            </div>
          </form>
        {/* testcases 1 2 3 section like leetcode*/}
        <div className="text-2xl mt-4">Testcases</div>
            <div>
              {/* Input Box*/}
              <div className="text-2xl">Input</div>
              <textarea
                className="border p-2"
                style={{
                  width: "100%",
                  height: "5vh",
                }}
                placeholder="Enter your input here"
                value={UserInput}
                onChange={(e) => setUserInput(e.target.value)}
              ></textarea>
              {/* Ouput Box*/}
              <div className="text-2xl mt-4">Output</div>
              <textarea
                className="border p-2"
                style={{
                  width: "100%",
                  height: "5vh",
                }}
                placeholder="Your ouput"
                value={Output}
                readOnly
              ></textarea>
            </div>
      </div>
        </ResizablePanel>
      </div>
      </ResizablePanelGroup>
      </>
    );
  }