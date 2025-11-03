"use client";

import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
const Like = ({ mediaId, canRemoveItem = false }) => {
  console.log("🚀 ~ Like ~ canRemoveItem:", canRemoveItem)
  const { data: session } = useSession();
  const router = useRouter();

  const handleLikeClicked = (e) => {
    e.preventDefault();
    if (!session) {
      signIn();
    }
    if (canRemoveItem) {
      fetch(`/api/like/${mediaId}`, {
        method: "DELETE",
      }).then(() => {
        router.refresh();
        return;
      });
    } else {
      console.log("🚀 ~ handleLikeClicked ~ mediaId:", mediaId);
      fetch(`/api/like/${mediaId}`, {
        method: "POST",
      })
    }
  };
  return (
    <div onClick={handleLikeClicked}>
      <FontAwesomeIcon icon={!canRemoveItem ? faHeart : faTrash} />
    </div>
  );
};

export default Like;
