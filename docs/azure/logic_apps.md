---
sidebar_position: 2
---

# Logic Apps

設定 Recurrence 定期送 HTTP Request 給 Fruit_web `ScheduleController`.

Status Failed:

```
BadRequest. Http request failed: the server did not respond within the timeout limit. Please see logic app limits at <https://aka.ms/logic-apps-limits-and-config#http-limits>.

```

原因是 Azure App Service 有一個規則，如果收到 request 兩分鐘內伺服器沒有 response result，則會自動 response 一個 400 BadRequest，但伺服器其實是正常執行的。