export const whoAmIDesc = {
  method: "GET",
  url: "/api/user/whoami",
  schema: {
    tags: ["user"],

    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          email: { type: "string" },
        },
      },
      default: {
        type: "string",
      },
    },
  },
};

export const signInDesc = {
  method: "POST",
  url: "/api/user/sign-in",
  schema: {
    tags: ["auth"],
    body: {
      email: { type: "string" },
      password: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          access_token: { type: "string" },
        },
      },
      default: {
        type: "string",
      },
    },
  },
};

export const signUpDesc = {
  method: "POST",
  url: "/api/user/sign-in",
  schema: {
    tags: ["auth"],

    body: {
      email: { type: "string" },
      name: { type: "string" },
      password: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          access_token: { type: "string" },
        },
      },
      default: {
        type: "string",
      },
    },
  },
};
