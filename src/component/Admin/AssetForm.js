import React from "react";
import { Link } from "react-router-dom";
import TextInput from "../Shared/Input/TextInput";
import DateInput from "../Shared/Input/DateInput";
import SelectInput from "../Shared/Input/SelectInput";

export default function AssetForm({
  handleChange,
  handleSubmit,
  validation,
  asset,
  showEmployeeField,
  employees,
  setAsset,
  isEdit,
}) {
  const statusOptions = [
    { label: "Available", value: "Available" },
    { label: "In Use", value: "InUse" },
    { label: "Disposed", value: "Disposed" },
    { label: "Request to Return", value: "Return" },
    { label: "Maintenance", value: "Maintenance" },
  ];
  const WarrantyStatusOptions = [
    { label: "Active", value: "Active" },
    { label: "Expired", value: "Expired" },
  ];
  const categoryOptions = [
    { label: "Monitors", value: "Monitors" },
    { label: "Laptop", value: "Laptop" },
    { label: "PC", value: "PC" },
    { label: "Printer", value: "Printer" },
    { label: "Phone", value: "Phone" },
  ];
  return (
    <form onSubmit={handleSubmit} className="mb-4 px-10">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Asset Name"
          id="name"
          name="name"
          value={asset.name}
          onChange={handleChange}
          error={validation.name}
        />
        <TextInput
          label="Asset ID"
          id="AssetID"
          name="AssetID"
          value={asset.AssetID}
          onChange={handleChange}
          error={validation.AssetID}
        />
        <SelectInput
          label="Asset Status"
          id="Status"
          name="Status"
          value={asset.Status}
          onChange={handleChange}
          options={statusOptions}
          error={validation.Status}
        />

        <TextInput
          label="Serial Number"
          id="SerialNumber"
          name="SerialNumber"
          value={asset.SerialNumber}
          onChange={handleChange}
          error={validation.SerialNumber}
        />

        <TextInput
          label="Asset Model"
          id="Model"
          name="Model"
          value={asset.Model}
          onChange={handleChange}
          error={validation.Model}
        />
        <DateInput
          label="Insertion Date"
          id="date"
          name="date"
          value={asset.date}
          onChange={handleChange}
          error={validation.date}
        />
        <TextInput
          label="Asset Brand"
          id="Brand"
          name="Brand"
          value={asset.Brand}
          onChange={handleChange}
          error={validation.Brand}
        />

        <SelectInput
          label="Asset Category"
          id="Category"
          name="Category"
          value={asset.Category}
          onChange={handleChange}
          options={categoryOptions}
          error={validation.Category}
        />
        <TextInput
          label="Operating System:"
          id="os"
          name="os"
          value={asset.os}
          onChange={handleChange}
          error={validation.os}
        />
        <div className="w-full">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            id="description"
            type="text"
            name="description"
            value={asset.description}
            onChange={handleChange}
            rows="8"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
            placeholder="Your description here"
            required
          ></textarea>
        </div>
        {showEmployeeField && (
          <>
            <div class="sm:col-span-2 pb-2 mb-2 rounded-t border-b sm:mb-2">
              <h3 class="text-lg font-semibold text-gray-900 ">
                Employee Info
              </h3>
            </div>
            <div className="">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="employee"
              >
                Employee:
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                value={asset.employeeId}
                onChange={(e) =>
                  setAsset({ ...asset, employeeId: e.target.value })
                }
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
                {/* Other employee options */}
              </select>
            </div>
          </>
        )}
        <FormSubheader title={"Optional Information"} />
        <TextInput
          label="Warranty Type"
          id="WarrantyType"
          name="WarrantyType"
          value={asset.WarrantyType}
          onChange={handleChange}
          error={validation.WarrantyType}
        />
        <SelectInput
          label="Warranty Status"
          id="WarrantyStatus"
          name="WarrantyStatus"
          value={asset.WarrantyStatus}
          onChange={handleChange}
          options={WarrantyStatusOptions}
          error={validation.WarrantyStatus}
        />
        <DateInput
          label="Warranty End Date"
          id="WarrantyEndDate"
          name="WarrantyEndDate"
          value={asset.WarrantyEndDate}
          onChange={handleChange}
          error={validation.WarrantyEndDate}
        />
        <FormSubheader title={"Order Related Information"} />
        <TextInput
          label="Order Number"
          id="OrderNumber"
          name="OrderNumber"
          value={asset.OrderNumber}
          onChange={handleChange}
          error={validation.OrderNumber}
        />
        <DateInput
          label="Purchase Date"
          id="PurchaseDate"
          name="PurchaseDate"
          value={asset.PurchaseDate}
          onChange={handleChange}
          error={validation.PurchaseDate}
        />
        <TextInput
          label="Purchase Cost (SAR)"
          id="PurchaseCost"
          name="PurchaseCost"
          value={asset.PurchaseCost}
          onChange={handleChange}
          error={validation.PurchaseCost}
        />
        <TextInput
          label="Supplier"
          id="Supplier"
          name="Supplier"
          value={asset.Supplier}
          onChange={handleChange}
          error={validation.Supplier}
        />
      </div>
      <div className="flex items-center justify-between">
        <Link
          to={`/Asset`}
          className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Cancel
        </Link>
        <button
          className="bg-teal-700 hover:bg-teal-900 text-white font-bold my-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isEdit ? "Edit Asset" : "Add Asset"}
        </button>
      </div>
    </form>
  );
}

const FormSubheader = ({ title }) => {
  return (
    <div class="sm:col-span-2 pb-2 mb-2 rounded-t border-b sm:mb-2">
      <h3 class="text-lg font-semibold text-gray-900 ">
        {/* Order Related Information */}
        {title}
      </h3>
    </div>
  );
};
