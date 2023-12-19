"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaStar } from "react-icons/fa6";
import { FaEllipsis } from "react-icons/fa6";
import Cookies from "js-cookie";
import axios from "axios";
// import moment from 'moment';
import { getUserComment } from "@/services/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import api from "@/services/api";
import { UserComment } from "@/interfaces/user";
import { getTransactionHistory } from "@/services/transactionHistory";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
export default function Comments({
  productId,
  _id,
}: {
  productId: string;
  _id: string;
}) {
  const [dataUser, setDataUser] = useState<UserComment | null>(null);
  const [modals, setModals] = useState<string[]>([]);
  const [visibleDivs, setVisibleDivs] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { name, avatar } = useAppSelector((state) => state.user);
  const [editedContent, setEditedContent] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null!);
  const [dataComments, setDataComments] = useState([]);
  const [comment, setComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [childReplyComment, setChildReplyComment] = useState("");
  const [child2ReplyComment, setChild2ReplyComment] = useState("");
  const [editCommentContent, setEditCommentContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState<null | number>(null);
  const [hover, setHover] = useState<null | number>(null);

  const token = Cookies.get("token");

  const fetchDataUser = async () => {
    const res = await getUserComment(token);
    setDataUser(res);
  };

  const fetchDataComment = async () => {
    try {
      const response = await api.get(
        `/comment?product-slug=${productId}&limit=30&page=1`
      );
      const data = response.data.data;
      if (data && data.result && Array.isArray(data.result)) {
        const sortedData = data.result.sort((a: any, b: any) => {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
        setDataComments(sortedData);
      } else {
        console.error("Dữ liệu không hợp lệ từ API");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (token != null) {
      fetchDataUser();
    }

    fetchDataComment();
  }, [productId, reloadData]);

  const handleSendButtonClick = async (parent: any) => {
    //( câu này nó dư để tạm t fix lại )
    // const commentToSend = comment === "" ?
    //     (childReplyComment !== "" ? childReplyComment :
    //         (child2ReplyComment !== "" ? child2ReplyComment : replyComment))
    //     : comment;
    if (comment === "" && replyComment === "") {
      toast.warn("Bạn phải đánh giá đi kèm nội dung");
      return;
    }

    try {
      if (comment !== "") {
        const response = await api.post(
          `/comment?content=${comment}&parent=${parent}&productSlug=${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      if (replyComment !== "") {
        const response = await api.post(
          `/comment?content=${replyComment}&parent=${parent}&productSlug=${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      // Reset comment-related states
      setComment("");
      setReplyComment("");
      setChildReplyComment("");
      setChild2ReplyComment("");

      closeVisibleDivs(parent);
      setReloadData((prev) => !prev);

      // Send rating and handle both promises with toast.promise
    } catch (error) {
      console.error("Lỗi khi đăng Đánh giá:", error);
    }
  };

  const deleteComment = async (commentId: any) => {
    try {
      const response = await api.delete(`/comment?comment=${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Đánh giá đã được xóa thành công");
        setReloadData((prev) => !prev);
      }
    } catch (error) {
      console.error("Lỗi khi xóa Đánh giá:", error);
    }
  };

  const handleUpdateComment = async (commentId: any, commentContent: any) => {
    try {
      const response = await api.patch(
        `/comment?comment=${commentId}&content=${commentContent}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleCloseButtonClick(commentId);
      toast.success("Comment updated successfully");
      setReloadData((prev) => !prev);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleCommentChange = (event: React.FormEvent<HTMLDivElement>) => {
    const updatedContent = (event.target as HTMLDivElement).textContent || "";
    setEditCommentContent(updatedContent);
  };

  const handleButtonClick = (buttonId: number) => {
    setVisibleDivs((prevVisibleDivs) => ({
      ...prevVisibleDivs,
      [buttonId]: !prevVisibleDivs[buttonId],
    }));
    modals.forEach((modalId) => {
      if (modalRef.current) {
        closeModal(modalId);
      }
    });
  };

  const closeVisibleDivs = (commentId: string) => {
    setVisibleDivs((prevVisibleDivs) => ({
      ...prevVisibleDivs,
      [commentId]: false,
    }));
    setEditedContent("");
  };

  const openModal = (modalId: string) => {
    setModals([...modals, modalId]);
  };

  const closeModal = (modalId: string) => {
    setModals(modals.filter((id) => id !== modalId));
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const isClickInsideSpan =
      event.target instanceof Element &&
      event.target.closest("span.cursor-pointer");
    if (!isClickInsideSpan) {
      // Đóng tất cả các modal đang mở
      modals.forEach((modalId) => {
        closeModal(modalId);
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [modals, closeModal]);

  const handleBlur = (commentId: string) => {
    closeModal(commentId);
  };

  const handleCloseButtonClick = (commentId: any) => {
    setIsEditing(false);
  };

  return (
    <div>
      <div>
        <div className="flex items-center">
          <h1 className="text-lg font-bold pb-4">Quản lý bình luận</h1>
        </div>
        {dataUser && (
          <div className="w-full p-6 bg-[#eff2ef] rounded-2xl mb-3">
            <div className="flex items-start">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-cover flex-shrink-0">
                <img
                  width={50}
                  height={50}
                  className="w-full h-full bg-cover object-cover"
                  src={dataUser.avatar}
                  alt=""
                />
              </div>
              <div className="ml-3 w-full">
                <div className="flex items-center mb-3">
                  <h1 className="text-base font-bold mr-3 ">{dataUser.name}</h1>
                  {dataUser.name === name && (
                    <>
                      <h4 className="bg-blue-50 text-primary px-2 py-1  rounded-lg uppercase text-xs font-bold border border-primary">
                        Chủ shop
                      </h4>
                    </>
                  )}
                </div>
                <div className="relative flex">
                  {/* <div className="w-full pr-[50px]">

                    <textarea
                      className="resize-none focus:outline-primary rounded-2xl pt-[15px] px-[14px] pb-[14px] w-full"
                      cols={30}
                      rows={10}
                      placeholder="Viết bình luận của bạn"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div> */}
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    className="resize-none focus:outline-primary rounded-2xl pt-[15px] px-[14px] pb-[14px] w-full"
                    placeholder="Nhập Đánh giá của bạn"
                  />
                  <span
                    onClick={() => handleSendButtonClick("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary"
                  >
                    <FaPaperPlane className="mr-2 cursor-pointer" />
                  </span>
                </div>
              </div>{" "}
              <br />
              <hr />
            </div>
          </div>
        )}
      </div>
      <div>
        <div>
          {dataComments.map((comment: any) => (
            <div key={comment._id}>
              {comment.parent === "" && (
                <div className="flex items-top w-full mb-2 bg-[#eff2ef] px-5 py-5 rounded-xl">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden  bg-cover flex-shrink-0 ">
                    <img
                      width={50}
                      height={50}
                      className="w-full h-full bg-cover object-cover"
                      src={comment.user.avatar}
                      alt="NOAVT"
                    />
                  </div>
                  <div className="ml-3 w-full">
                    <div className="flex group">
                      <div className="mb-2 inline-block w-full">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-[13px] mr-3">
                            @{comment.user.username}
                          </h3>
                          {comment.user.name === name && (
                            <>
                              <h4 className="bg-blue-50 text-primary px-2 py-1  rounded-lg uppercase text-xs font-bold border border-primary">
                                Chủ shop
                              </h4>
                            </>
                          )}
                          {/* <div className='flex justify-center items-center text-[#fde047]'>
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar className="text-gray-300 " />
                                                    </div> */}
                          {/* <div className='text-[#6b7280] text-xs font-semibold '>{moment(comment.createdAt).fromNow()}</div> */}
                        </div>
                        <div>
                          {isEditing !== comment._id && (
                            <>
                              <p className="text-base">{comment.content}</p>
                              <span className="text-xs mr-5">
                                {
                                  new Date(comment.createdAt)
                                    .toISOString()
                                    .split("T")[0]
                                }
                              </span>
                              <button
                                className="text-primary font-semibold text-sm mb-2"
                                onClick={() => handleButtonClick(comment._id)}
                              >
                                Trả lời
                              </button>
                            </>
                          )}
                          {isEditing === comment._id && (
                            <div className="w-full">
                              <div className="relative w-full max-w-[245px] md:max-w-[655px] lg:max-w-[20rem] lg:w-[20rem] mb-3">
                                <div className="border rounded-lg ">
                                  <textarea
                                    className="bg-gray-50 resize-none focus:outline-primary rounded-2xl  px-[14px] py-[14px] w-[1000px]"
                                    cols={30}
                                    rows={10}
                                    defaultValue={comment.content}
                                    onChange={(e) => {
                                      setEditCommentContent(e.target.value);
                                      console.log(e.target.value); // In giá trị nhập vào từ input ra console
                                    }}
                                  ></textarea>
                                </div>
                                <div className="flex justify-end mt-2 w-[1000px]">
                                  <button
                                    onClick={() =>
                                      handleCloseButtonClick(comment._id)
                                    }
                                    className="mr-2 px-3 rounded-full hover:bg-gray-100 py-2 text-[14px]  font-semibold"
                                  >
                                    Đóng
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleUpdateComment(
                                        comment._id,
                                        editCommentContent
                                      );
                                    }}
                                    className=" rounded-full px-3 py-2 text-[14px] bg-primary text-white font-semibold"
                                  >
                                    Chỉnh sửa
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {comment._id && visibleDivs[comment._id || ""] && (
                          <div className="flex items-start mb-3 bg-white  px-6 py-6 rounded-xl">
                            <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-cover flex-shrink-0">
                              <img
                                width={50}
                                height={50}
                                className="w-full h-full bg-cover object-cover"
                                src={`${avatar}`}
                                alt=""
                              />
                            </div>
                            <div className="ml-3 w-full">
                              <div className="flex items-center mb-3">
                                <h3 className="text-base font-bold mr-2 ">
                                  {name}
                                </h3>
                                <h4 className="bg-blue-50 text-primary px-2 py-1  rounded-lg uppercase text-xs font-bold border border-primary">
                                  Chủ shop
                                </h4>
                              </div>
                              <div className=" relative flex">
                                <div className="w-full pr-[50px]">
                                  <textarea
                                    className="bg-gray-50 resize-none focus:outline-primary rounded-2xl  px-[14px] py-[14px] w-full"
                                    cols={30}
                                    rows={10}
                                    value={replyComment}
                                    onChange={(e) => {
                                      setReplyComment(e.target.value);
                                      console.log(e.target.value); // In giá trị nhập vào từ input ra console
                                    }}
                                    placeholder="Viết đánh giá của bạn"
                                  ></textarea>
                                </div>
                              </div>
                              <div className="flex justify-end mt-2 px-12">
                                <button
                                  className="mr-2  px-2 rounded-full hover:bg-gray-100 py-1 text-sm  font-semibold"
                                  onClick={() => closeVisibleDivs(comment._id)}
                                >
                                  Đóng
                                </button>
                                <button
                                  onClick={() =>
                                    handleSendButtonClick(comment._id)
                                  }
                                  className=" px-3 rounded-full  py-2 text-sm bg-primary text-white font-semibold"
                                >
                                  Phản hồi
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="relative flex items-center">
                        <span
                          className="absolute right-0 top-3 cursor-pointer group-hover:block hidden"
                          onClick={() => openModal(comment._id)}
                          onBlur={() => handleBlur(comment._id)}
                        >
                          <FaEllipsis />
                        </span>
                        {modals.includes(comment._id) && (
                          <div
                            ref={modalRef}
                            className="absolute right-0 top-[0.5rem] mt-2 w-60 p-2 z-50 bg-white border rounded-md shadow-lg"
                          >
                            <div className="flex flex-col items-center">
                              <button
                                onClick={() => deleteComment(comment._id)}
                                className="w-full p-2 text-start text-xs font-medium hover:bg-gray-200 rounded-lg"
                              >
                                Xoá Đánh giá
                              </button>
                              <button
                                onClick={() => {
                                  setIsEditing(comment._id),
                                    closeModal(comment._id);
                                }}
                                className="w-full p-2 text-start text-xs font-medium hover:bg-gray-200 rounded-lg"
                              >
                                Sửa Đánh giá
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {dataComments
                      .filter(
                        (childComment: any) =>
                          childComment.parent === comment._id
                      )
                      .map((childComment: any) => (
                        <div key={childComment._id}>
                          <div className="flex bg-white p-5 rounded-xl mb-5">
                            <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-cover flex-shrink-0 ">
                              <img
                                width={50}
                                height={50}
                                className="w-full h-full bg-cover object-cover"
                                src={childComment.user.avatar}
                                alt=""
                              />
                            </div>
                            <div className="ml-3 w-full">
                              <div className="flex group">
                                <div className="inline-block w-full">
                                  <div className="flex items-center">
                                    <div className="flex items-center">
                                      <h3 className="font-semibold text-[13px] mr-2">
                                        @{childComment.user.username}
                                      </h3>
                                      {childComment.user.name === name && (
                                        <>
                                          <h4 className="bg-blue-50 text-primary px-2 py-1  rounded-lg uppercase text-xs font-bold border border-primary">
                                            Chủ shop
                                          </h4>
                                        </>
                                      )}
                                    </div>
                                    <div></div>
                                    {/* <div className='text-[#6b7280] text-xs font-semibold '>{moment(childComment.createdAt).fromNow()}</div> */}
                                  </div>
                                  <div>
                                    {isEditing !== childComment._id && (
                                      <div className="pr-4">
                                        <p className="mb-1 text-base">
                                          {childComment.content}
                                        </p>
                                        {/* <button
                                                                                    className='text-primary font-semibold text-sm mb-2'
                                                                                    onClick={() => handleButtonClick(childComment._id)}
                                                                                >
                                                                                    Trả lời
                                                                                </button> */}
                                      </div>
                                    )}
                                    {isEditing === childComment._id && (
                                      <>
                                        <div className="w-full">
                                          <div className="relative w-full max-w-[245px] md:max-w-[655px] lg:max-w-[20rem] lg:w-[20rem] mb-3">
                                            <div className="border rounded-lg ">
                                              <textarea
                                                className="bg-gray-50 resize-none focus:outline-primary rounded-2xl  px-[14px] py-[14px] w-[900px]"
                                                cols={30}
                                                rows={10}
                                                defaultValue={
                                                  childComment.content
                                                }
                                                onChange={(e) => {
                                                  setEditCommentContent(
                                                    e.target.value
                                                  );
                                                  console.log(e.target.value); // In giá trị nhập vào từ input ra console
                                                }}
                                              ></textarea>
                                            </div>
                                            <div className="flex justify-end mt-2 w-[900px]">
                                              <button
                                                onClick={() =>
                                                  handleCloseButtonClick(
                                                    childComment._id
                                                  )
                                                }
                                                className="mr-2 px-3 rounded-full hover:bg-gray-100 py-2 text-[14px]  font-semibold"
                                              >
                                                Đóng
                                              </button>
                                              <button
                                                onClick={() => {
                                                  handleUpdateComment(
                                                    childComment._id,
                                                    editCommentContent
                                                  );
                                                }}
                                                className=" rounded-full px-3 py-2 text-[14px] bg-primary text-white font-semibold"
                                              >
                                                Chỉnh sửa
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="relative flex items-center">
                                  <span
                                    className="absolute right-0 top-3 hidden group-hover:block group cursor-pointer"
                                    onClick={() => openModal(childComment._id)}
                                    onBlur={() => handleBlur(childComment._id)}
                                  >
                                    {" "}
                                    <FaEllipsis />{" "}
                                  </span>
                                  {modals.includes(childComment._id) && (
                                    <div
                                      ref={modalRef}
                                      className="absolute right-0 top-10 mt-2 w-60 p-2 z-50 bg-white border rounded-md shadow-lg"
                                    >
                                      <div className="flex flex-col items-center">
                                        <button
                                          onClick={() =>
                                            deleteComment(childComment._id)
                                          }
                                          className="w-full p-2 text-start text-xs font-medium hover:bg-gray-200 rounded-lg"
                                        >
                                          Xoá Đánh giá
                                        </button>
                                        <button
                                          onClick={() => {
                                            setIsEditing(childComment._id),
                                              closeModal(childComment._id);
                                          }}
                                          className="w-full p-2 text-start text-xs font-medium hover:bg-gray-200 rounded-lg"
                                        >
                                          Sửa Đánh giá
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
