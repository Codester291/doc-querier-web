/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Alert } from '@material-tailwind/react'
import { fetchUserFiles, uploadFile, queryDoc } from '../utils/api.service'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SpinnerDotted } from 'spinners-react'

function Dashboard() {
  const [File, setFormData] = useState<File | null>(null);
  const [data, setData] = useState([]);
  const [content, setContent] = useState([]);
  const [FileName, setFileName] = useState('');
  const [Prompt, setPrompt] = useState('');
  const [Enabled, isEnabled] = useState(false);

  const token = 'c87af9b0-0d74-4ae0-939a-1f78cd96249d'

  const fetchUserFileData = async () => {
    const result = await fetchUserFiles()
    console.log(result)
    const { code, message, data } = result.data
    if (code === '00') {
      setData(data)
      return toast("Welcome to Doc_Querier")
    } else {
      return toast(message)
    }
  }

  useEffect(() => {
    fetchUserFileData()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFormData(event.target.files[0])
    }
  }

  const handlePromptChange = (event: any) => {
    setPrompt(event.target.value)
  }

  const handleFileName = (fileName: string) => {
    setFileName(fileName);
    toast(`${fileName} is selected and ready to be queried`)
  }

  const handleFileUpload = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData()

    if (File) {
      formData.append('file', File)

      const response = await uploadFile(formData)
      const { code, message } = response.data
      if (code === '00') {
        toast(message)
        window.location.reload()
      } else {
        toast(message)
      }
    }
  }

  const handleQueryFile = async () => {
    isEnabled(true)
    const payload = {
      fileName: FileName,
      query: Prompt
    }

    const result = await queryDoc(payload);
    const { code, message, data } = result.data;
    if (code === '00') {
      setContent(data);
      setPrompt('')
      isEnabled(false)
    } else {
      toast(message)
      isEnabled(false)
    }
  }

  function formatFileSize(fileSizeInBytes: number): string {
    if (fileSizeInBytes === 0) {
      return '0 Bytes'
    }

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(fileSizeInBytes) / Math.log(1024))
    const formattedSize = (fileSizeInBytes / Math.pow(1024, i)).toFixed(2)

    return `${formattedSize} ${sizes[i]}`
  }
  return (
    <>
      {!token ? (
        <Alert color="red">Error </Alert>
      ) : (
        <div className="grid grid-cols-2 divide-x h-screen">
          <div className="border-none p-8 overflow-y-auto">
            <ToastContainer toastClassName={"toast"}/>
            <h1 className="text-3xl font-bold" id="logo">
              Doc_Querier
            </h1>
            <br />
            <br />
            <h3 className="text-2xl" id="logo">
              Upload Doc {'>'} Query the Doc
            </h3>
            <br />
            <br />
            <br />
            <br />
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <input
                  className="block w-full text-sm p-4 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleFileUpload}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Upload
                </button>
              </div>

              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                PDF, TXT, XLSX or DOCX
              </p>
            </div>
            <br />
            <br />
            <br />
            <br />

            <div className="w-full max-w-6xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Your Files
                </h5>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  View all
                </a>
              </div>
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {data.map((file) => (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {file.fileName}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {formatFileSize(file.fileSize)}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <button
                            onClick={() => handleFileName(file.fileName)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Select file
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-none p-8 bg-gray-600">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              id="promptHeader"
            >
              Your Prompt results display here
            </label>
            <textarea
              id="message"
              rows={30}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-y-auto"
              value={content ? content: 'No prompt to display yet'}
              disabled
            ></textarea>
            <br />
            <div className="flex justify-evenly">
              <input
                type="text"
                placeholder="Query your doc"
                className=" max-w-lg bg-gray-50 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                onChange={handlePromptChange}
                value={Prompt}
              />
              <button
                onClick={handleQueryFile}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 active:outline-none"
              >
                Query
              </button>
              <SpinnerDotted size={20} enabled={Enabled} color='#007aff'/>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
