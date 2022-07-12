"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    console.log("event 👉", event);
    return {
        body: JSON.stringify({ message: "Successful PUBLIC lambda invocation" }),
        statusCode: 200,
    };
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVPLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsRUFBRTtJQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUvQixPQUFPO1FBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUscUNBQXFDLEVBQUUsQ0FBQztRQUN4RSxVQUFVLEVBQUUsR0FBRztLQUNoQixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBUFcsUUFBQSxPQUFPLFdBT2xCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L3JlcXVpcmUtYXdhaXQgKi9cblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zb2xlLmxvZyhcImV2ZW50IPCfkYlcIiwgZXZlbnQpO1xuXG4gIHJldHVybiB7XG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiBcIlN1Y2Nlc3NmdWwgUFVCTElDIGxhbWJkYSBpbnZvY2F0aW9uXCIgfSksXG4gICAgc3RhdHVzQ29kZTogMjAwLFxuICB9O1xufTtcbiJdfQ==