export const createDocumentDesc = {
  method: "POST",
  url: "/api/document",
  schema: {
    tags: ["document"],
    body: {
      name: { type: "string" },
    },
  },
};

export const deleteDocumentDesc = {
  method: "DELETE",
  url: "/api/document/{:id}",
  schema: {
    tags: ["document"],
    params: {
      id: { type: "number" },
    },
  },
};

export const getDocumentsDesc = {
  method: "GET",
  url: "/api/user/whoami",
  schema: {
    tags: ["document"],
  },
};

export const getDocumentDesc = {
  method: "GET",
  url: "/api/document/{:id}",
  schema: {
    tags: ["document"],
    params: {
      id: { type: "number" },
    },
  },
};

export const getDocumentWithParagraphsDesc = {
  method: "GET",
  url: "/api/document/{:id}/paragraphs",
  schema: {
    tags: ["document"],
    params: {
      id: { type: "number" },
    },
  },
};

export const copyDocumentDesc = {
  method: "POST",
  url: "/api/document/{:id}",
  schema: {
    tags: ["document"],
    params: {
      id: { type: "number" },
    },
  },
};

export const patchDocumentDesc = {
  method: "PATCH",
  url: "/api/document/{:id}",
  schema: {
    tags: ["document"],
    params: {
      id: { type: "number" },
    },
    body: {
      name: { type: "string" },
    },
  },
};
