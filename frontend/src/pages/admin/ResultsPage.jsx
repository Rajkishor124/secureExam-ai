import { useEffect, useState } from "react";

import { getAllResults }
from "../../services/resultService";

function ResultsPage() {

  const [results, setResults] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {

    const fetchResults = async () => {

      try {

        const data =
          await getAllResults();

        setResults(data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchResults();

  }, []);

  const filteredResults =
    results.filter((result) =>
      result.student?.name
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  return (
    <div className="
      min-h-screen
      bg-slate-900
      text-white
      p-8
    ">

      <h1 className="
        text-4xl
        font-bold
        mb-8
      ">
        Results Management
      </h1>

      <input
        type="text"
        placeholder="Search Student..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
        className="
          w-full
          md:w-96
          p-3
          rounded-xl
          bg-slate-800
          mb-8
        "
      />

      <div className="
        bg-slate-800
        rounded-2xl
        overflow-hidden
      ">

        <table className="w-full">

          <thead>

            <tr className="
              bg-slate-700
            ">

              <th className="p-4">
                Student
              </th>

              <th>
                Email
              </th>

              <th>
                Exam
              </th>

              <th>
                Score
              </th>

              <th>
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredResults.map(
                (result) => (

                <tr
                  key={result._id}
                  className="
                    border-b
                    border-slate-700
                  "
                >

                  <td className="p-4">
                    {
                      result.student?.name
                    }
                  </td>

                  <td>
                    {
                      result.student?.email
                    }
                  </td>

                  <td>
                    {
                      result.exam?.title
                    }
                  </td>

                  <td>
                    {result.score}
                  </td>

                  <td>
                    {
                      new Date(
                        result.createdAt
                      ).toLocaleDateString()
                    }
                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ResultsPage;