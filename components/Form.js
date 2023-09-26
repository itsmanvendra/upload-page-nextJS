import React, { useState, useRef, useEffect } from "react";
import { BiEnvelope, BiLoaderCircle } from "react-icons/bi";
import { FaFileArrowUp } from "react-icons/fa6";
import Modal from "./Modal";

export const Form = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [entriesCount, setEntriesCount] = useState(0);
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!isEmailValid(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setParsing(true);
      const reader = new FileReader();
      if (file.type !== "application/json") {
          alert("Please upload a valid JSON file");
          setParsing(false);
          return;
        }
    reader.onload = (e) => {
      setEntriesCount(JSON.parse(e.target.result).length);
      setFileContent(JSON.stringify(JSON.parse(e.target.result), null, 2));
      setParsing(false);
    };
    reader.readAsText(file);
  };

    const onClose = () => {
    setIsOpen(false);
    };
    
    const onGoToEntries = () => {
        setIsOpen(false);
        window.location.reload();
    }


  useEffect(() => {
    if (!nameError && name && !emailError && email && fileContent) {
      console.log("Form is valid");
      setButtonDisabled(false);
    } else {
      console.log("Form is invalid");
    }
  }, [nameError, emailError, fileContent, name, email]);

  return (
    <>
      <form className="w-full">
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="text-base">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className="rounded-md my-2 p-2 bg-slate-50"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
            }}
            onBlur={() => {
              if (!name) {
                setNameError(true);
              }
            }}
          />
          {nameError && (
            <p className="text-red-500 text-sm">Please enter a name</p>
          )}
        </div>
        <div className="flex flex-col relative mb-2">
          <label htmlFor="email" className="text-base">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="rounded-md my-2 p-2 bg-slate-50"
            placeholder="Email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
            onBlur={() => {
              if (!isEmailValid(email)) {
                setEmailError(true);
              }
            }}
          />
          <BiEnvelope
            size={28}
            className="absolute right-4 top-10 text-sm text-slate-300"
          />
          {emailError && (
            <p className="text-red-500 text-sm">Please enter a valid email</p>
          )}
        </div>
        <div className="flex flex-col relative mb-2">
          <label htmlFor="uploadFile" className="text-base mb-4">
            Upload JSON File
          </label>
          <div
            className="w-full h-32 py-8 bg-slate-100 border-2 border-dashed rounded-md"
            onClick={(e) => {
              fileInputRef.current.click();
            }}
          >
            {parsing ? (
              <BiLoaderCircle size={28} className="mx-auto text-blue-500" />
            ) : (
              <FaFileArrowUp size={28} className="mx-auto text-blue-500" />
            )}
            <div className="text-center">
              <input
                type="file"
                className="hidden"
                accept="application/JSON"
                ref={fileInputRef}
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />
              {parsing ? (
                <div className="text-base text-blue-500"> Validating... </div>
              ) : (
                <button
                  className="text-sm text-gray-500"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Browse File
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col relative mb-12">
          <label htmlFor="content" className="text-base mb-4">
            File Contents
          </label>
          <textarea
            id="content"
            rows={6}
            cols={30}
            className="overflow-auto bg-slate-100 rounded-md"
            value={fileContent}
            disabled
          />
        </div>
        <div className="border-t-2 border-solid py-8 justify-center items-center flex">
          <button
            type="submit"
            className={`bg-blue-500 rounded-full text-lg text-white font-semibold w-full p-4 ${
              buttonDisabled ? "opacity-50" : ""
            }`}
            disabled={buttonDisabled}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <Modal isOpen={isOpen} onClose={onClose} entriesCount={entriesCount} onGoToEntries={onGoToEntries} />
    </>
  );
};
