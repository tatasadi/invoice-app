export default function Attribution() {
  return (
    <div className="mt-10">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mx-4 sm:mx-0 text-xs mb-4" role="alert">
        <strong className="font-bold">Demo Notice:</strong>
        <span className="block sm:inline"> This website is a demonstration project and is not intended for production use. All data displayed and functionalities provided are for evaluation and testing purposes only. Do not use this site to process or store sensitive or personal information.</span>
        <span className="block sm:inline"> Use of this website is at your own risk. We make no warranties regarding uptime, data security, or reliability. By proceeding, you agree that the developers, contributors, and associated organizations are not liable for any damages arising from use of this demo site. </span>
      </div>
      <div className=" flex w-full flex-col text-center text-sm sm:flex-row sm:justify-center sm:gap-1">
        <div>
          Challenge by{" "}
          <a
            href="https://www.frontendmentor.io"
            target="_blank"
            className="footer-link"
            rel="noreferrer noopener"
          >
            Frontend Mentor
          </a>
          ,{" "}
        </div>
        <div>
          Coded by{" "}
          <a
            className="footer-link"
            href="https://www.linkedin.com/in/ehsan-tatasadi-2161a433"
            target="_blank"
            rel="noreferrer noopener"
          >
            Ehsan Tatasadi
          </a>
          ,{" "}
        </div>
        <div>
          <a
            className="footer-link"
            href="https://github.com/tatasadi/invoice-app"
            target="_blank"
            rel="noreferrer noopener"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  )
}
