import documentsModel from "../dao/models/documents.model.js";

const documentService = {
  createDocument: async (documentData) => {
    try {
      const document = new documentsModel(documentData);
      await document.save();
      return document;
    } catch (error) {
      throw new Error("Failed to create the document.");
    }
  },

  findDocsById: async (filter) => {
    try {
      const documents = await documentsModel.find(filter).lean();
      return documents;
    } catch (error) {
      throw new Error("Failed to fetch documents.");
    }
  },

  deleteDocumentById: async (documentId) => {
    try {
      const deletedDocument = await documentsModel.findByIdAndRemove(documentId);
      if (!deletedDocument) {
        throw new Error("Document not found.");
      }
      return deletedDocument;
    } catch (error) {
      throw new Error("Failed to delete the document.");
    }
  },
};

export default documentService;
