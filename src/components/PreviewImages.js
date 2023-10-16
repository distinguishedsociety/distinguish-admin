import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

export const PreviewImages = ({ productImages, handleDelete }) => {
  return (
    <>
      <div
        className="row"
        id="gallery"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <div class="col-12 col-sm-6 col-lg-3 d-flex">
          {productImages.map((image, index) => {
            return (
              <>
                <div className="m-2 p-2" key={index}>
                  <img
                    className="w-100"
                    src={image}
                    data-target="#carouselExample"
                    data-slide-to={index}
                  />
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDelete(image, index)}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div
                id="carouselExample"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img className="d-block w-100" src="/image-1.jpg" />
                  </div>
                  {productImages.map((image, index) => (
                    <div
                      className={
                        index === 0 ? "carousel-item active" : "carousel-item"
                      }
                    >
                      <img className="d-block w-100" src={image} />
                    </div>
                  ))}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExample"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExample"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
