"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";

interface exmp{
  input : string,
  output : string,
  explanation : string
}

interface Problem {
  name: string;
  description: string;
  difficulty: string;
  constraints: string[];
  code: string;
  firstCode: string;
  lastCode: string;
  testCases: string;
  inputTc: string;
  outputTc: string;
  example : exmp[];
}

export default function UploadPage() {
  const router = useRouter(); 
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [firstCode, setFirstCode] = useState<string>("");
  const [lastCode, setLastCode] = useState<string>("");
  const [testCases, setTestCases] = useState<string>("");
  const [inputTc, setInputTc] = useState<string>("");
  const [outputTc, setoutputTc] = useState<string>("");
  const [constraints, setConstraints] = useState<string[]>([""]);
  const [examples, setExamples] = useState<exmp[]>([{
    input : "",
    output : "",
    explanation : ""
  }]);
  const [submit, setSubmit] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSubmit(true);
      const data : Problem = {
        name: name,
        description: description,
        difficulty: difficulty,
        constraints: constraints,
        code: code,
        firstCode: firstCode,
        lastCode: lastCode,
        testCases: testCases,
        inputTc: inputTc,
        outputTc: outputTc,
        example : examples
      }
      console.log(data);
      const response = await axios.post("/api/submit/newproblemSubmit", data);
      if (response.data.status == 200) {
        console.log(response.data);
        alert("Successfully uploaded")
        if (router) {
          router.push("/questions");
        }
      }
      else{
        alert("Not Uploaded")
      }
    } catch (error) {
      alert("Not Uploaded")
      console.error(error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-11">
      <label>Problem Name</label>
      <input
        type="text"
        placeholder="Problem Name"
        className="w-96 h-12 m-4 border border-black rounded-md px-4"
        onChange={(e) => setName(e.target.value )}
      />
      <textarea
        placeholder="Problem Description"
        className="w-96 h-12 m-4 border border-black rounded-md px-4"
        onChange={(e) => setDescription(e.target.value )}
      />
      <textarea
        placeholder="Problem Difficulty"
        className="w-96 h-12 m-4 border border-black rounded-md px-4"
        onChange={(e) => setDifficulty(e.target.value )}
      />
      <div className="flex flex-col bg-slate-400 p-4 rounded-md">
      <p>Problem Constraints</p>
          {
            constraints.map((input , index) => {
              return (
                  <div key={index} className="flex flex-col">
                    <textarea 
                      placeholder={`Problem Constraint ${index + 1}`}
                      className="w-96 h-12 m-4 border border-black rounded-md px-4"
                      name="constraints"
                      value={input}
                      onChange={(e) => {
                        var data = [...constraints]
                        data[index] = e.target.value;
                        setConstraints(data);
                      }}
                    />
                    <button className="bg-blue-300 rounded-lg text-white" onClick={(e) =>{
                      e.preventDefault();
                      var data = [...constraints];
                      data.splice(index, 1);
                      setConstraints(data);
                    }}> Delete </button>
                    {
                      (index + 1) === constraints.length ? 
                      <button className="bg-blue-300 rounded-lg text-white mt-2" onClick={(e) =>{
                        e.preventDefault();
                        var data = [...constraints , ""];
                        setConstraints(data)
                      }}> Add </button> :
                      ""
                    }
                  </div>
              )
            })
          }
      </div>

      <textarea
        placeholder="Problem Code"
        className="w-96 h-12 m-4 border border-black rounded-md px-4"
        onChange={(e) => setCode(e.target.value )}
      />
      <textarea
        placeholder="First Code"
        className="w-96 h-12 m-4 border border-black rounded-md px-4"
        onChange={(e) => setFirstCode(e.target.value )}
      />
      <textarea
        placeholder="Last Code"
        className="w-96 h-12 m-4 border border-black rounded-md px-4"
        onChange={(e) => setLastCode(e.target.value )}
      />
      {/* For taking example input */}
      <div className="flex flex-col bg-slate-400 p-4 rounded-md">
        <p>Examples</p>
        {
          examples.map((input, index) => {
            return(
              <div key={index} className="flex flex-col">
                <textarea
                   placeholder={`Input ${index + 1}`}
                  className="w-96 h-12 m-4 border border-black rounded-md px-4"
                  value={input.input}
                  onChange={(e) => {
                    var data = [...examples];
                    data[index].input = e.target.value;
                    setExamples(data);
                  }}
                />
                <textarea
                   placeholder={`Output ${index + 1}`}
                  className="w-96 h-12 m-4 border border-black rounded-md px-4"
                  value={input.output}
                  onChange={(e) => {
                    var data = [...examples];
                    data[index].output = e.target.value;
                    setExamples(data);
                  }}
                />
                <textarea
                   placeholder={`Explanation ${index + 1}`}
                  className="w-96 h-12 m-4 border border-black rounded-md px-4"
                  value={input.explanation}
                  onChange={(e) => {
                    var data = [...examples];
                    data[index].explanation = e.target.value;
                    setExamples(data);
                  }}
                />
                <button className="bg-blue-300 rounded-lg text-white" onClick={(e) =>{
                  e.preventDefault();
                  var data = [...examples];
                  data.splice(index, 1);
                  setExamples(data);
                }}> Delete </button>
                {
                  (index + 1) === examples.length ? 
                  <button className="bg-blue-300 rounded-lg text-white mt-2" onClick={(e) =>{
                    e.preventDefault();
                    var data = [...examples , {
                      input : "",
                      output : "",
                      explanation : ""
                    }];
                    setExamples(data)
                  }}> Add </button> :
                  ""
                }
              </div>
            )
          })
        }
      </div>
      <textarea
        placeholder="Problem TestCases"
        className="w-96 h-12 m-4 border border-black rounded-md px-4"
        onChange={(e) => setTestCases(e.target.value )}
      />
      <textarea
        placeholder="Correct Input"
        className="w-96 h-12 m-4 border border-black rounded-md px-4"
        onChange={(e) => setInputTc(e.target.value )}
      />
      <textarea
        placeholder="Correct Output"
        className="w-96 h-12 m-4 border border-black rounded-md px-4"
        onChange={(e) => setoutputTc(e.target.value )}
      />

      <button
        onClick={handleSubmit}
        disabled={submit}
        className={`w-96 h-12 m-4 px-4 ${
          submit ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
        }`}
      >
        {submit ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
