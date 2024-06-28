const Product = (props) => {
  return (
    <div
      className="flex w-[365px] flex-col items-center justify-center hover:cursor-pointer max-xl:w-[250px] max-lg:w-[200px] max-md:w-full max-md:flex-row max-md:items-start max-md:justify-start max-md:gap-5 max-sm:gap-2.5"
      onClick={props.onClick}
    >
      <img
        src={props.src}
        alt={props.src}
        style={{ width: props.imageWidth, height: props.imageHeight }}
        className="h-[410px] w-[365px] rounded-2xl max-xl:h-[281px] max-xl:w-[250px] max-lg:h-[200px] max-lg:w-[200px] max-sm:h-[140px] max-sm:w-[140px]"
      />
      <div className="relative flex flex-col items-center justify-center text-center max-md:w-[60%] max-md:items-start max-md:text-left max-sm:mr-4">
        <h5
          style={{ fontSize: props.nameSize }}
          className="mx-0 mb-[8px] mt-[18px] text-lg font-medium leading-[29px] tracking-tight text-darkslategray-300 max-lg:text-sm max-lg:leading-5"
        >
          {props.name}
        </h5>
        <div className="mb-2 flex items-center gap-1 text-darkslategray-300 [&_span]:text-base [&_span]:leading-[18px] [&_span]:tracking-tight max-lg:[&_span]:text-xs max-lg:[&_span]:leading-[18px]">
          <img src="/ruppee.png" alt="ruppee" className="h-[15px] w-[15px]" />
          <span style={{ fontSize: props.infoSize }}>{props.cost}</span>
          <img src="/ellipse.png" alt="ellipse" className="h-1 w-1" />
          <span style={{ fontSize: props.infoSize }}>{props.amount}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.40285 0.543118C5.6474 0.047673 6.3539 0.0476729 6.59846 0.543118L7.90569 3.19143C8.00271 3.38799 8.19017 3.5243 8.40707 3.556L11.3315 3.98344C11.8781 4.06334 12.0959 4.73523 11.7002 5.12067L9.58518 7.1807C9.42793 7.33386 9.35615 7.55462 9.39326 7.77097L9.89227 10.6805C9.98568 11.2251 9.41398 11.6404 8.9249 11.3832L6.31095 10.0085C6.1167 9.90639 5.8846 9.90639 5.69035 10.0085L3.07641 11.3832C2.58732 11.6404 2.01562 11.2251 2.10903 10.6805L2.60804 7.77097C2.64515 7.55462 2.57337 7.33386 2.41612 7.1807L0.301103 5.12067C-0.0946258 4.73523 0.12323 4.06334 0.66984 3.98344L3.59423 3.556C3.81113 3.5243 3.99859 3.38799 4.09561 3.19142L5.40285 0.543118Z"
              fill="#F79420"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.40285 0.543118C5.6474 0.047673 6.3539 0.0476729 6.59846 0.543118L7.90569 3.19143C8.00271 3.38799 8.19017 3.5243 8.40707 3.556L11.3315 3.98344C11.8781 4.06334 12.0959 4.73523 11.7002 5.12067L9.58518 7.1807C9.42793 7.33386 9.35615 7.55462 9.39326 7.77097L9.89227 10.6805C9.98568 11.2251 9.41398 11.6404 8.9249 11.3832L6.31095 10.0085C6.1167 9.90639 5.8846 9.90639 5.69035 10.0085L3.07641 11.3832C2.58732 11.6404 2.01562 11.2251 2.10903 10.6805L2.60804 7.77097C2.64515 7.55462 2.57337 7.33386 2.41612 7.1807L0.301103 5.12067C-0.0946258 4.73523 0.12323 4.06334 0.66984 3.98344L3.59423 3.556C3.81113 3.5243 3.99859 3.38799 4.09561 3.19142L5.40285 0.543118Z"
              fill="#F79420"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.40285 0.543118C5.6474 0.047673 6.3539 0.0476729 6.59846 0.543118L7.90569 3.19143C8.00271 3.38799 8.19017 3.5243 8.40707 3.556L11.3315 3.98344C11.8781 4.06334 12.0959 4.73523 11.7002 5.12067L9.58518 7.1807C9.42793 7.33386 9.35615 7.55462 9.39326 7.77097L9.89227 10.6805C9.98568 11.2251 9.41398 11.6404 8.9249 11.3832L6.31095 10.0085C6.1167 9.90639 5.8846 9.90639 5.69035 10.0085L3.07641 11.3832C2.58732 11.6404 2.01562 11.2251 2.10903 10.6805L2.60804 7.77097C2.64515 7.55462 2.57337 7.33386 2.41612 7.1807L0.301103 5.12067C-0.0946258 4.73523 0.12323 4.06334 0.66984 3.98344L3.59423 3.556C3.81113 3.5243 3.99859 3.38799 4.09561 3.19142L5.40285 0.543118Z"
              fill="#F79420"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.40285 0.543118C5.6474 0.047673 6.3539 0.0476729 6.59846 0.543118L7.90569 3.19143C8.00271 3.38799 8.19017 3.5243 8.40707 3.556L11.3315 3.98344C11.8781 4.06334 12.0959 4.73523 11.7002 5.12067L9.58518 7.1807C9.42793 7.33386 9.35615 7.55462 9.39326 7.77097L9.89227 10.6805C9.98568 11.2251 9.41398 11.6404 8.9249 11.3832L6.31095 10.0085C6.1167 9.90639 5.8846 9.90639 5.69035 10.0085L3.07641 11.3832C2.58732 11.6404 2.01562 11.2251 2.10903 10.6805L2.60804 7.77097C2.64515 7.55462 2.57337 7.33386 2.41612 7.1807L0.301103 5.12067C-0.0946258 4.73523 0.12323 4.06334 0.66984 3.98344L3.59423 3.556C3.81113 3.5243 3.99859 3.38799 4.09561 3.19142L5.40285 0.543118Z"
              fill="#F79420"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.40285 0.543118C5.6474 0.047673 6.3539 0.0476729 6.59846 0.543118L7.90569 3.19143C8.00271 3.38799 8.19017 3.5243 8.40707 3.556L11.3315 3.98344C11.8781 4.06334 12.0959 4.73523 11.7002 5.12067L9.58518 7.1807C9.42793 7.33386 9.35615 7.55462 9.39326 7.77097L9.89227 10.6805C9.98568 11.2251 9.41398 11.6404 8.9249 11.3832L6.31095 10.0085C6.1167 9.90639 5.8846 9.90639 5.69035 10.0085L3.07641 11.3832C2.58732 11.6404 2.01562 11.2251 2.10903 10.6805L2.60804 7.77097C2.64515 7.55462 2.57337 7.33386 2.41612 7.1807L0.301103 5.12067C-0.0946258 4.73523 0.12323 4.06334 0.66984 3.98344L3.59423 3.556C3.81113 3.5243 3.99859 3.38799 4.09561 3.19142L5.40285 0.543118Z"
              fill="#F79420"
            />
          </svg>

          <span
            className="ml-[3px] text-base leading-[18px] tracking-tight text-darkslategray-300 max-lg:text-sm"
            style={{ fontSize: props.infoSize }}
          >
            ({props.rating})
          </span>
        </div>
        {props.add ? (
          <div className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-customgreen-800 max-md:left-[120px] max-md:h-6 max-md:w-6">
            <img
              src="/add.png"
              alt="add"
              className="h-6 w-6 max-md:h-[18px] max-md:w-[18px]"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Product;
