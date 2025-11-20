import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map(c => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const districtsByRegion = region => {
    const regionDistricts = serviceCenters.filter(c => c.region === region);
    const districts = regionDistricts.map(d => d.district);
    return districts;
  };
  console.log(regions);

  const handleSendParcel = data => {
    console.log(data);
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
              className="input w-full"
              placeholder="Enter Sender name."
            />

            {/* sender Email */}
            <label className="label">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              className="input w-full"
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
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
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

            {/* Receiver address */}
            <label className="label mt-4">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="Enter Receiver Address."
            />

            {/* Receiver District */}
            <label className="label mt-4">Receiver District</label>
            <input
              type="text"
              {...register("receiverDistrict")}
              className="input w-full"
              placeholder="Enter Receiver District."
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
          className="btn btn-primary text-black"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default SendParcel;
