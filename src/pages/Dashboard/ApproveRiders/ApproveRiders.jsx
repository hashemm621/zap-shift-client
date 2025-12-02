import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider,status) =>{
const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then(res => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  const handleApproval = rider => {
    updateRiderStatus(rider,'Approved')
  };
  const handleRejection = rider =>{
    updateRiderStatus(rider,'Rejected')
  }

  const handleRiderDetails = rider =>{
    console.log(rider);
  }
  return (
    <div>
      <h2 className="text-5xl">Riders Pending Approval {riders.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>
                  <p
                    className={`${
                      rider.status === "Approved"
                        ? "text-green-800"
                        : "text-red-500"
                    }`}>
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td>
                  <button
                    onClick={() => handleRiderDetails(rider)}
                    className="btn">
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn">
                    <FaUserCheck />
                  </button>

                  <button onClick={()=>handleRejection(rider)} className="btn">
                    <IoPersonRemove />
                  </button>
                  <button className="btn">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
