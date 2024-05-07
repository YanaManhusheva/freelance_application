import React from "react";
import Wrapper from "../assets/wrappers/PageBthContainer";
import { useAllProjectsContext } from "../pages/AllProjects";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

const PageBthContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllProjectsContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  const addPageButton = ({ pageNum, activeClass }) => {
    console.log(pageNum);
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNum}
        onClick={() => handlePageChange(pageNum)}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first page
    pageButtons.push(
      addPageButton({ pageNum: 1, activeClass: currentPage === 1 })
    );
    //dots
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }
    if (currentPage !== 1 && currentPage !== 2) {
      //one before current
      pageButtons.push(
        addPageButton({
          pageNum: currentPage - 1,
          activeClass: false,
        })
      );
    }
    if (currentPage !== 1 && currentPage !== numOfPages)
      //current page
      pageButtons.push(
        addPageButton({
          pageNum: currentPage,
          activeClass: true,
        })
      );
    //one after current
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNum: currentPage + 1,
          activeClass: false,
        })
      );
    }
    //dots
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }
    //last page
    pageButtons.push(
      addPageButton({
        pageNum: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PageBthContainer;
