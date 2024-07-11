import type { MenuProps, SliderSingleProps } from "antd";
import { Button, Input, Menu, Slider, Spin } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../redux/features/products/productApi";
const { Search } = Input;
type MenuItem = Required<MenuProps>["items"][number];

const Products = () => {
  const [filters, setFilters] = useState<{
    searchTerm: null | string;
    maxPrice: null | number;
    minPrice: null | number;
    sort: null | string;
  }>({
    searchTerm: "",
    maxPrice: null,
    minPrice: null,
    sort: "",
    //categoryId: null,
  });
  const { data, isLoading } = useGetProductsQuery(filters);

  const onSearch: SearchProps["onSearch"] = (value) => {
    setFilters({ ...filters, searchTerm: value });
  };

  const marks: SliderSingleProps["marks"] = {
    0: "$0",
    5000: "$5000",
  };

  const sortItems: MenuItem[] = [
    // {
    //   key: "01",
    //   label: "Categories",
    //   //icon: <SettingOutlined />,
    //   children: [
    //     { key: "9", label: "Option 9" },
    //     { key: "10", label: "Option 10" },
    //     { key: "11", label: "Option 11" },
    //     { key: "12", label: "Option 12" },
    //   ],
    // },
    {
      key: "01",
      label: "Sort By",
      //icon: <SettingOutlined />,
      children: [
        { key: "1", label: "Low to High" },
        { key: "2", label: "High to Low" },
      ],
    },
  ];
  const onSortMenuClicked: MenuProps["onClick"] = (e) => {
    console.log(
      "click ",
      e,
      e.key === sortItems[0].children[0].key ? "-price" : "price"
    );
    setFilters({
      ...filters,
      sort: e.key === sortItems[0]!.children[0].key ? "-price" : "price",
    });
  };

  const onPriceRangeChange = (value: number[]) => {
    setFilters({ ...filters, maxPrice: value[1], minPrice: value[0] });
  };

  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-4">
      <div className="col-span-1 shadow bg-secondary rounded-xl p-5">
        <div className="flex justify-between">
          <h3>Filter By:</h3>
          {(filters.maxPrice || filters.minPrice || filters.sort) && (
            <Button
              onClick={() =>
                setFilters({
                  searchTerm: "",
                  maxPrice: null,
                  minPrice: null,
                  sort: "",
                })
              }
              type="text"
              danger
            >
              Clear All
            </Button>
          )}
        </div>
        <div>
          {(filters.maxPrice || filters.minPrice) && (
            <p>
              Price: ${filters.minPrice ? filters.minPrice : "0"}-$
              {filters.maxPrice ? filters.maxPrice : "5000"}
            </p>
          )}
        </div>
        <Slider
          range
          max={5000}
          min={0}
          defaultValue={[0, 5000]}
          onChangeComplete={onPriceRangeChange}
          marks={marks}
        />
        <Menu
          onClick={onSortMenuClicked}
          style={{ width: "100%" }}
          mode="inline"
          items={sortItems}
        />
      </div>
      <div className="sm:col-span-3">
        <div className="flex justify-around">
          <h1 className=" text-highlight font-bold text-2xl mb-4">
            All Products
          </h1>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <div className="flex gap-5 justify-center items-center flex-wrap">
          {data?.data.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              imgHeight={200}
              imgWidth={200}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
