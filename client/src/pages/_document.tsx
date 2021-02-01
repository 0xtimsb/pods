import { resetServerContext } from "react-beautiful-dnd";
import Document, { DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return initialProps;
  }
}

export default MyDocument;
