import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = region => {
    const regionDistricts = serviceCenters.filter(c => c.region === region);
    const districts = regionDistricts.map(d => d.district);
    return districts;
  };

  const handleSendParcel = data => {
    console.log(data);
    const parcelWeight = parseFloat(data.parcelWeight);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost
    // sweet alert
    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I Agree",
    }).then(result => {
      if (result.isConfirmed) {
        //save the parcel info to database
        axiosSecure.post('/parcels', data).then(res =>{
          console.log('after saving parcel', res.data);
        })

        // Swal.fire({
        //   title: "Canceled!",
        //   text: "Your parcel has been Canceled.",
        //   icon: "success",
        // });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 p-4 text-black">
        {/* parcel type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              className="radio"
              {...register("parcelType")}
              value="document"
              defaultChecked
            />{" "}
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              className="radio"
              {...register("parcelType")}
              value="non-document"
            />{" "}
            Non-Document
          </label>
        </div>

        {/* parcel info : name,weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {/* parcel name */}
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Enter your parcel name."
            />
          </fieldset>
          {/* parcel info */}
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Enter your parcel weight."
            />
          </fieldset>
        </div>

        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender details */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* sender name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              defaultValue={user?.displayName}
              className="input w-full"
              readOnly
              placeholder="Enter Sender name."
            />

            {/* sender Email */}
            <label className="label">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              className="input w-full"
              defaultValue={user?.email}
              readOnly
              placeholder="Enter Sender Email."
            />

            {/* sender phone */}
            <label className="label">Sender Phone</label>
            <input
              type="number"
              {...register("senderPhone")}
              className="input w-full"
              placeholder="Enter Sender Phone Number."
            />

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a Region"
                className="select">
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option
                    key={i}
                    value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a District"
                className="select">
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(senderRegion).map((r, i) => (
                  <option
                    key={i}
                    value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender address */}
            <label className="label mt-4">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="Enter Sender Address."
            />

            {/* sender Description */}
            <label className="label">Parcel Description</label>
            <input
              type="textArea"
              {...register("senderDescription")}
              className="textarea w-full"
              placeholder="Enter Parcel Description."
            />
          </fieldset>

          {/* receiver details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>
            {/* sender name */}
            <label className="label">Receiver Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="Enter Receiver name."
            />

            {/* receiver Email */}
            <label className="label">Receiver Email</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="Enter receiver Email."
            />

            {/* receiver phone */}
            <label className="label">Receiver Phone</label>
            <input
              type="number"
              {...register("receiverPhone")}
              className="input w-full"
              placeholder="Enter Receiver Phone Number."
            />

            {/* receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a Region"
                className="select">
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option
                    key={i}
                    value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver District */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select">
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(receiverRegion).map((r, i) => (
                  <option
                    key={i}
                    value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver address */}
            <label className="label mt-4">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="Enter Receiver Address."
            />

            {/* receiver Description */}
            <label className="label">Parcel Description</label>
            <input
              type="textArea"
              {...register("receiverDescription")}
              className="textarea w-full"
              placeholder="Enter Parcel Description."
            />
          </fieldset>
        </div>

        {/* submit button */}
        <input
          type="submit"
          className="btn btn-primary mt-4 text-black"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
