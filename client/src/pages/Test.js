import { useNavigate, createSearchParams, Link } from "react-router-dom";

export default function Test() {
  const navigate = useNavigate();
  return (
    <div>
      <Link
        to={{
          pathname: "/sub-cars",
          search: `?${createSearchParams({
            type: "cars",
          })}`,
        }}
      >
        <button>First Method - Take me to Sub Cars</button>
      </Link>

      <br />
      <br />

      <button
        onClick={() => {
          navigate({
            pathname: "sub-cars",
            search: `?${createSearchParams({
              type: "cars",
            })}`,
          });
        }}
      >
        Second Method - Take me to Sub Cars
      </button>
    </div>
  );
}

// const Models = () => {
//         let [searchParams, setSearchParams] = useSearchParams();

//     let type = searchParams.get("type")

//     useEffect(() => {
//       console.log("lol! the type is " , type );
//      }, [type ]);

//    return (
//      <>
//        <Navbar />
//        <span>{type}</span>
//      </>
//    );
//  };
