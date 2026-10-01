import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { toast } from 'react-toastify';

export function MyList({ data, enq, Swal, setFormData }) {

  let deleteRow = (del) => {

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`https://to-do-list-mern-rho.vercel.app/api/website/delete/${del}`)
          .then((res) => {
            toast.success("delete data success");
            enq()
          });
        Swal.fire("Saved!", "", "success");
      }

      else if (result.isDenied) Swal.fire("Changes are not saved", "", "info");
    });
  }

  let updateRow = (up) => {

    axios.get(`https://to-do-list-mern-rho.vercel.app/api/website/update/${up}`)
      .then((res) => {
        let data = res.data
        setFormData(data.veiw)
      });

  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table hoverable>
          <TableHead>
            <TableRow>
              <TableHeadCell className="!bg-gray-700 !text-gray-100">Sr No</TableHeadCell>
              <TableHeadCell className="!bg-gray-700 !text-gray-100">Name</TableHeadCell>
              <TableHeadCell className="!bg-gray-700 !text-gray-100">Email</TableHeadCell>
              <TableHeadCell className="!bg-gray-700 !text-gray-100">Phone</TableHeadCell>
              <TableHeadCell className="!bg-gray-700 !text-gray-100">Message</TableHeadCell>
              <TableHeadCell className="!bg-gray-700 !text-gray-100">
                <span className="sr-only">Edit</span>
              </TableHeadCell>
              <TableHeadCell className="!bg-gray-700 !text-gray-100">
                <span className="sr-only">Delete</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-gray-200">
            {
              data.map((item, index) => (
                <TableRow
                  key={item._id || index}
                  className="bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-gray-700">{item.name}</TableCell>
                  <TableCell className="text-gray-700">{item.email}</TableCell>
                  <TableCell className="text-gray-700">{item.phone}</TableCell>
                  <TableCell className="text-gray-700">{item.message}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => updateRow(item._id)}
                      className="px-3 py-1 text-sm font-medium rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                    >
                      Edit
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => deleteRow(item._id)}
                      className="px-3 py-1 text-sm font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              )
              )}
          </TableBody>
        </Table>
      </div>
    </>
  );

}
