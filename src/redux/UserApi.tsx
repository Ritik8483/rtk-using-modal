import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/user.model";
export const usersApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["addTagType"],
  reducerPath: "usersApi",
  endpoints: (builder) => ({
    allUsers: builder.query<User[], void>({
      //for all users
      query: () => "/users",
      providesTags: ["addTagType"],
    }),
    singleUser: builder.query<User, any>({
      //for single user,bcoz individual contact so any or string (id)
      query: (id) => `/users/${id}`,
      providesTags: ["addTagType"],
    }),
    addUserData: builder.mutation<void, User>({
      //for adding user,void bcoz we add new detail not getting any data (prev data)
      query: (newUserDetail) => ({
        url: "/users",
        method: "POST",
        body: newUserDetail,
      }),
      invalidatesTags: ["addTagType"],
    }),
    updateUser: builder.mutation<void, User>({
      query: ({ id, ...rest }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: rest,                     //bcoz we need rest details we already have id (name,email)
      }),
      invalidatesTags: ["addTagType"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        //   body: newUserDetail,
      }),
      invalidatesTags: ["addTagType"],
    }),
  }),
});

//when we create endpoints rtk query exposes some hooks
export const {
  useAllUsersQuery,
  useSingleUserQuery,
  useAddUserDataMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;
