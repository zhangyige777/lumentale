# LumenTale.online 流量恢复全面修复文档

更新日期：2026-06-03

## 文档目标

这份文档用于指导 `lumentale.online` 的全面修复，目标是让网站重新具备稳定获得 Google 搜索流量的能力，并提升用户停留时间、页面质量、索引稳定性和广告收益基础。

需要先明确一点：任何人都不能保证做完后 Google 流量一定恢复到之前的峰值。Google 算法、核心更新、游戏热度、用户搜索量都不受网站控制。我们能保证的是：把网站自身所有会影响流量恢复的问题尽量修掉，让网站达到“Google 愿意重新抓取、重新评估、重新展示”的状态。

## 当前问题判断

这次不是单纯点击率下降，而是 Google 展现量断崖式下降。

- 旧 24 小时数据：约 1539 点击，14803 展现。
- 新 24 小时数据：7 点击，96 展现。
- 掉得最明显的页面是 `/evolution-guide/`，从 771 点击、7033 展现掉到 1 点击、25 展现。
- `/animon/`、`/type-chart/`、`/best-starter/`、`/locations/`、多个 `/evolution/` 页面也大幅减少展现。
- 核心页面目前可以正常打开，返回 200。
- 核心页面没有发现全站性 `noindex`。
- `robots.txt` 和 `sitemap.xml` 可访问。
- Google 仍然能搜到站点页面，所以不是全站被移除索引。

目前更可能的原因是：

- Google 核心更新期间，新站和低权重站点展现被重新评估。
- LumenTale 刚发布后的搜索高峰回落。
- 网站里存在较多 “not verified yet / partial / pending” 内容，Google 可能认为页面完整度不足。
- 全站弹窗、跳转类广告会伤害用户体验和停留时间。
- 部分核心页面还不够像真正完整的攻略页，更多像数据整理页。

## 总体修复原则

修复时要遵守以下原则：

- 不伪造游戏数据。
- 不把未验证内容写成已确认。
- 不为了 SEO 堆关键词。
- 不频繁每天大改标题。
- 不添加会跳转、弹窗、遮挡内容的广告。
- 每次更新都要让页面对玩家更有用。
- 先修核心页，再修单个详情页。
- 每次改完都要构建通过，并检查 GSC 是否有新问题。

## 要完成的所有事情

### 1. 保持弹窗和跳转广告关闭

全站弹窗、跳转、popunder、强制新窗口广告会明显伤害停留时间，也会让新站更难获得 Google 信任。

要做：

- 移除全站 `<head>` 里的弹窗和跳转广告脚本。
- 只保留页面内广告位。
- 广告不能出现在主内容之前。
- 广告不能遮挡正文。
- 广告不能强制用户跳转。

完成标准：

- 用户打开首页和核心攻略页时，可以直接看到正文。
- 页面不会自动弹窗、跳转或打开新标签。
- 平均互动时长不再因为广告干扰继续下降。

### 2. 修复并验证 noindex 问题

GSC 已经发现过 `Excluded by 'noindex' tag`，示例是：

`https://lumentale.online/animon/owaxle/`

要做：

- 确认 Owaxle 页面已经是 `index, follow`。
- 在 GSC 里对该 URL 执行 Live Test。
- 点击 Validate Fix。
- 请求重新索引。
- 检查是否还有其他误加 noindex 的页面。

完成标准：

- GSC Live Test 显示页面允许索引。
- noindex issue 进入验证流程。
- 之后受影响页面数量下降。

### 3. 手动请求核心页面重新索引

这些页面是恢复流量最重要的入口：

- `https://lumentale.online/`
- `https://lumentale.online/evolution-guide/`
- `https://lumentale.online/animon/`
- `https://lumentale.online/type-chart/`
- `https://lumentale.online/best-starter/`
- `https://lumentale.online/locations/`
- `https://lumentale.online/walkthrough/`

要做：

- 在 GSC URL Inspection 里逐个检查。
- 确认 Live URL 能抓取。
- 确认允许索引。
- 请求索引。

完成标准：

- 每个核心 URL 都完成 Request indexing。
- 没有发现 404、noindex、canonical 错误。

### 4. 把 `/evolution-guide/` 做成真正的主攻略页

这个页面曾经贡献最多流量，必须作为第一核心页维护。

要做：

- 增加清晰的快速答案，解释 LumenTale 怎么进化。
- 增加 starter evolution chain：
  - Mewaii → Maidelly
  - Vortail → Furtex
  - Ozelash → Kouzear
  - Salabel → Vilender
  - Queccha → Quequator
- 增加 Mythos / Logos 对最终进化的影响说明。
- 增加所有已知 evolution chain 表格。
- 增加 wild Animon evolution 区块。
- 增加 hidden type evolution 区块。
- 把 confirmed、partial、unverified 分清楚。
- 每一行都链接到对应 Animon 页面和 evolution 页面。
- FAQ 覆盖玩家真实会搜的问题。

完成标准：

- 用户不用继续搜索，也能理解目前已知的进化系统。
- 页面明确区分确认数据和未验证数据。
- 页面能覆盖 `lumentale evolution guide`、`lumentale evolution`、`lumentale starter evolutions`、`lumentale how to evolve` 等搜索意图。

### 5. 把 `/animon/` 做成完整数据库入口

这个页面要承接 `lumentale animon list`、`lumentale all animon`、`all animons lumentale` 等搜索。

要做：

- 增加静态可抓取的页面摘要。
- 增加 starter Animon 区块。
- 增加热门 Animon 区块：
  - Mewaii
  - Vortail
  - Ozelash
  - Salabel
  - Queccha
  - Boobat
  - Mushwick
  - Owaxle
  - Vilender
- 增加按 type 浏览的静态入口。
- 增加按 attribute 浏览的静态入口。
- 保证 Google 不依赖前端筛选也能理解页面内容。
- 表格里不要出现乱码、空值、明显占位符。

完成标准：

- 页面不是只有搜索框和客户端筛选。
- 重要 Animon 都有普通 HTML 链接。
- 页面内容足够支撑 “all animon list” 的搜索意图。

### 6. 把 `/type-chart/` 做成可用的类型攻略

虽然完整克制关系还没验证，但页面不能只写“未验证”。

要做：

- 展示 13 个已确认类型。
- 每个类型列出已记录 Animon。
- 增加 starter 类型速览。
- 增加属性搭配说明。
- 增加队伍规划建议。
- 说明 exact matchup multipliers 还未验证。
- 链接到 weakness calculator、team builder、Animon list。

完成标准：

- 页面即使没有完整克制表，也对玩家有实际帮助。
- 页面能覆盖 `lumentale type chart`、`lumentale weakness chart`、`lumentale types` 等搜索。
- 不把未确认克制关系写成事实。

### 7. 优化 `/best-starter/`

这个页面能承接高意图搜索，适合提升停留时间。

要做：

- 增加 5 个 starter 的优缺点。
- 增加适合玩家类型：
  - 新手
  - 输出型玩家
  - 稳定型玩家
  - 喜欢暴击/资源循环的玩家
- 增加 starter evolution 说明。
- 增加 Mythos / Logos 对最终进化影响的提醒。
- 增加推荐结论，但不要过度绝对。

完成标准：

- 用户能根据玩法选择 starter。
- 页面链接到 starter 单页和 evolution guide。
- 页面能覆盖 `lumentale best starter`、`lumentale starter evolutions`。

### 8. 优化 `/locations/`

这个页面之前有流量，但内容还需要更像地点攻略。

要做：

- 增加 Talea、Mythos、Logos 的说明。
- 增加 Points of Interest 说明。
- 增加 Fountains、Anispace 等系统说明。
- 如果具体 encounter 还没验证，就明确写 “location data pending”，不要空着。
- 链接到 walkthrough、animon、evolution guide。

完成标准：

- 页面能承接 `lumentale map`、`lumentale locations`。
- 页面不是空地点列表。
- 用户能知道地点系统目前确认到什么程度。

### 9. 优化所有 `/evolution/[slug]/` 单页

这些页面曾经带来很多长尾流量。

要做：

- 每页增加当前进化链。
- 每页说明进化方法是否确认。
- 每页说明 level 是否确认。
- 每页链接到前后进化形态。
- 每页链接回 evolution guide。
- starter 相关页面要说明 Mythos / Logos 最终进化。
- wild Animon 页面要说明来源和验证状态。

完成标准：

- 每个 evolution 单页不是薄页面。
- 每个页面都有独立价值。
- 页面能覆盖 `boobat evolution lumentale`、`owaxle evolution lumentale` 等长尾搜索。

### 10. 优化所有 `/animon/[slug]/` 单页

Animon 单页不能只是一段短描述和几个空字段。

要做：

- 增加 quick answer。
- 增加 type、attribute、starter、evolution、source status。
- 增加相关 Animon。
- 增加 same type Animon。
- 增加 FAQ。
- 类型未验证时，用自然语言说明，不要出现空的 `-type`。
- 未验证数据要说明状态，但不要让整页看起来像占位页。

完成标准：

- 每个可索引 Animon 页面都有完整标题、描述、FAQ。
- 没有空标题、空 type、乱码箭头。
- 低质量 placeholder 页面不进入索引。

### 11. 修复乱码和显示问题

目前代码输出里有一些乱码符号，比如箭头和破折号显示异常。

要做：

- 修复页面里的乱码：
  - `鈫?`
  - `鈥?`
  - `馃幃`
- 统一用普通 ASCII 文案或正确 Unicode。
- 检查生成后的 HTML。

完成标准：

- 用户页面不再出现乱码。
- 搜索摘要不会出现乱码。
- 结构化数据里没有乱码。

### 12. 增加真实数据更新流程

Google 喜欢持续维护且真实更新的资料站。

要做：

- 每天检查官方 Steam 新闻。
- 每天检查官方站点。
- 每天检查可靠第三方攻略。
- 更新 verified data。
- 更新 patch notes。
- 更新 Last verified。
- 不做纯改日期的假更新。

完成标准：

- 每次数据更新都有真实内容变化。
- patch notes 能说明更新了哪些数据。
- sitemap lastmod 反映真实更新。

### 13. 控制索引页面质量

不是页面越多越好。薄页面太多会拖累新站质量。

要做：

- confirmed 页面允许索引。
- partial 但有真实内容的页面允许索引。
- placeholder 页面 noindex。
- community-only 且内容薄的页面 noindex。
- 没有 type、没有 evolution、没有描述的页面不要索引。

完成标准：

- sitemap 里只放值得索引的页面。
- GSC 不再大量出现 crawled/discovered currently not indexed。
- 可索引页面都有足够内容。

### 14. 改善内部链接结构

内部链接要帮助用户连续浏览，也帮助 Google 理解页面关系。

要做：

- 首页链接到核心页。
- 核心页互相链接。
- Animon 页面链接到 evolution 页面。
- Evolution 页面链接到 Animon 页面。
- Type chart 链接到 type 下的 Animon。
- Best starter 链接到 starter 单页。
- Locations 链接到 walkthrough 和 Animon。

完成标准：

- 用户从任意核心页都能继续点到相关页面。
- 重要页面距离首页不超过 2 次点击。
- 长尾页面有回链到核心页。

### 15. 提升停留时间

平均互动时长只有约 15 秒，需要提升到 35 秒以上。

要做：

- 首屏给直接答案。
- 页面中部给表格、对比、跳转入口。
- 页面底部给 FAQ 和相关页面。
- 减少广告干扰。
- 增加真正有用的工具：
  - team builder
  - weakness calculator
  - starter recommender
  - evolution lookup

完成标准：

- GA4 平均互动时长提升到 35 秒以上。
- 用户访问核心页后继续点击其他页面。
- 页面不再像只看一眼就离开的薄内容页。

### 16. 安全恢复广告收益

RPM 低不能靠加更多干扰广告解决，先恢复流量和停留时间。

要做：

- 优先使用低干扰广告。
- 广告放在答案区之后。
- 不在首屏正文前放大广告。
- 不使用跳转、弹窗、假关闭按钮。
- 每次加广告后观察互动时长。

完成标准：

- 广告不破坏阅读。
- 页面体验不下降。
- RPM 提升时，GSC 展现和 GA4 停留不明显变差。

### 17. 每天监控 GSC 数据

每天都要看数据，不要靠感觉判断。

要做：

- 导出最近 24 小时 GSC 数据。
- 对比 clicks、impressions、position。
- 看 top pages。
- 看 top queries。
- 看 page indexing。
- 记录新增问题。

完成标准：

- 能知道是哪个页面掉了。
- 能知道是哪个查询掉了。
- 能判断是 CTR 问题、排名问题，还是展现池问题。

### 18. 每次发布前做技术检查

要做：

- 运行 `npm run build`。
- 检查核心页是否 200。
- 检查 robots 是否允许。
- 检查 sitemap 是否包含核心页。
- 检查页面是否 `index, follow`。
- 检查 canonical 是否正确。
- 检查结构化数据是否正常。
- 检查是否有乱码。

完成标准：

- 构建成功。
- 没有误 noindex。
- 没有核心页 404。
- 没有明显乱码或空标题。

## 做完后如何判断是否恢复

不能只看一天，要至少连续看 3 天。

可以认为进入恢复状态的标准：

- GSC 展现从 96/day 回到 500/day 以上。
- 点击不再是个位数。
- `/evolution-guide/` 重新获得稳定展现。
- `/animon/`、`/type-chart/`、`/best-starter/` 有展现回升。
- 平均互动时长超过 35 秒。
- GSC 没有新的大规模 noindex、404、canonical 错误。

可以认为恢复正常的标准：

- 连续 3 天展现稳定。
- 连续 3 天点击稳定。
- 核心页排名没有继续恶化。
- 长尾 evolution 查询重新出现。
- 新增内容能带来新的查询词。

## 如果 7 天后还没有恢复

如果全面修复后 7 天仍然没有明显恢复，需要继续做更深层动作：

- 减少可索引薄页面数量。
- 继续扩展核心攻略页内容。
- 增加外部引用和真实来源链接。
- 获取自然外链，比如 Reddit、Steam 社区、攻略论坛、Wiki 引用。
- 检查是否有 Cloudflare、防火墙、缓存、地区访问问题。
- 检查 Google 是否把页面判定为重复或低质量。
- 重新审查广告策略。

## 每日维护流程

每天按这个顺序做：

1. 看 GSC 最近 24 小时数据。
2. 记录总点击、总展现、平均排名。
3. 找掉得最多的 3 个页面。
4. 找还在展示但 CTR 低的查询。
5. 给一个核心页补真实内容。
6. 修复一个薄页面或乱码问题。
7. 如果页面有实质更新，就请求索引。
8. 不要无意义频繁改标题。
9. 不要恢复弹窗广告。

## 最终目标

最终目标不是只把短期流量拉回来，而是让网站成为 LumenTale 英文资料搜索里最稳定的资料站：

- 玩家能查 Animon。
- 玩家能查 evolution。
- 玩家能查 type chart。
- 玩家能查 starter。
- 玩家能查 map 和 locations。
- 玩家能用工具规划队伍。
- Google 能信任页面质量。
- 广告收益建立在稳定流量和良好体验上。

