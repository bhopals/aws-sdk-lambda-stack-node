"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    console.log("event 👉", event);
    return {
        body: JSON.stringify({ message: "Successful private lambda invocation" }),
        statusCode: 200,
    };
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVPLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUvQixPQUFPO1FBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsQ0FBQztRQUN6RSxVQUFVLEVBQUUsR0FBRztLQUNoQixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBUFcsUUFBQSxPQUFPLFdBT2xCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L3JlcXVpcmUtYXdhaXQgKi9cblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zb2xlLmxvZyhcImV2ZW50IPCfkYlcIiwgZXZlbnQpO1xuXG4gIHJldHVybiB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiBcIlN1Y2Nlc3NmdWwgcHJpdmF0ZSBsYW1iZGEgaW52b2NhdGlvblwiIH0pLFxuICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgfTtcbn07XG4iXX0=