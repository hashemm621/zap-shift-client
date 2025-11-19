import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

            {/* sender address */}
            <label className="label mt-4">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="Enter Sender Address."
            />

            {/* sender District */}
            <label className="label mt-4">Sender District</label>
            <input
              type="text"
              {...register("senderDistrict")}
              className="input w-full"
              placeholder="Enter Sender District."
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
