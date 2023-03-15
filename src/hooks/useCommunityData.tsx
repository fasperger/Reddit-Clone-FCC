import { authModalState } from '@/atoms/authModalAtom';
import { Community, CommunitySnippet, communityState } from '@/atoms/communitiesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, getDoc, getDocs, increment, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';


const useCommunityData = () => {
    const [user] = useAuthState(auth);

    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onJoinOrLeaveCommunity = (
        communityData: Community,
        isJoined: boolean
    ) => {

        //is user signed in?
        //if not, open auth modal
        if (!user) {
            setAuthModalState({ open: true, view: 'login' });
            return;
        }

        setLoading(true);
        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData);
    }

    const getMySnippets = async () => {
        setLoading(true);
        try {
            const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));
            const snippets = snippetDocs.docs.map(doc => ({ ...doc.data() }));
            setCommunityStateValue(prev => (
                {
                    ...prev,
                    mySnippets: snippets as CommunitySnippet[],
                }
            )
            );

        } catch (error: any) {
            console.log("getMySnippetsError", error)
            setError(error.message);
        }
        setLoading(false);
    }
    const joinCommunity = async (communityData: Community) => {
        //batch writes -- check firebase documentation on batch writes
        //create a new community snippet
        try {
            const batch = writeBatch(firestore);

            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || "",
            }

            batch.set(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityData.id
                ),
                newSnippet
            );
            //updating the number of members on this community (+1)
            batch.update(
                doc(
                    firestore,
                    "communities",
                    communityData.id
                ),
                { numberOfMembers: increment(1), }
            );

            await batch.commit();

            //update recoil state communityState.mySnippets
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }))

        } catch (error: any) {
            console.log('joinCommunity error', error);
            setError(error.message);
        }

        setLoading(false);
    };
    const leaveCommunity = async (communityId: string) => {

        try {
            //batch write
            const batch = writeBatch(firestore);
            //deleting community snippet from user
            batch.delete(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityId
                )
            )
            //updating number of members (-1)
            batch.update(
                doc(
                    firestore,
                    "communities",
                    communityId,
                ),
                { numberOfMembers: increment(-1), }
            );

            await batch.commit();

            //update recoil state communityState.mySnippets. 
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(item => item.communityId !== communityId),
            }))

        } catch (error: any) {
            console.log('leaveCommunity error', error);
            setError(error.message);
        }

        setLoading(false);

    };

    useEffect(() => {
        if (!user) return;
        getMySnippets();
    }, [user]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    }
}
export default useCommunityData;