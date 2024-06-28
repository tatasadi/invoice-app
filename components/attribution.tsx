export default function Attribution() {
  return (
    <div className="mt-20 flex w-full flex-col text-center text-sm sm:flex-row sm:justify-center sm:gap-1">
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
  )
}
