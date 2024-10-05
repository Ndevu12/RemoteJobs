import React from "react";
import { Search } from 'lucide-react';

interface Props {
  filterJobsForm: (formData: {
    title: string;
  }) => void;
}

const FilterForm = (props: Props) => {
  const onFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const filterInputs: {
      location?: string;
      title: string;
      fulltime?: string;
    } = {
      title: `${formData.get("title")}`,
    };

    props.filterJobsForm(filterInputs);
    (event.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={onFilterSubmit} className="w-[20%] flex flex-col md:flex-row items-center mr-4 gap-4 p-4 rounded-md">
      <div className="flex items-center w-full md:w-2/3 bg-gray-100 p-2 rounded-md">
        <Search className="text-gray-500 mr-2" />
        <input
          type="text"
          name="title"
          className="flex-grow bg-transparent border-none outline-none p-2"
          placeholder="Filter by job title"
        />
      </div>
      <div className="flex items-center w-full md:w-1/3">
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md flex items-center justify-center">
          <Search className="mr-2" />
          Search
        </button>
      </div>
    </form>
  );
};

export default FilterForm;