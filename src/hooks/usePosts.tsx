import { Post, postState } from '@/atoms/postAtom';
import { firestore, storage } from '@/firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useRecoilState } from 'recoil';

const usePosts = () => {

    const [postStateValue, setPostStateValue] = useRecoilState(postState);

    const onVote = async () => { };

    const onSelectPost = () => { };

    const onDeletePost = async (post: Post): Promise<boolean> => {

        try {
            //check if image is attached and delete it from firebase
            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            }
            //deletes the post document itself in firestore
            const postDocRef = doc(firestore, 'posts', post.id!);
            await deleteDoc(postDocRef);

            //update recoil state so that we do not see deleted post
            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter(item => item.id !== post.id),
            }))

        } catch (error) {

        }

        return true;
    };

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost,
    };
};
export default usePosts;