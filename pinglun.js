<!-- 评论系统组件的 HTML -->
<div id="comment-section">
    <h3>评论</h3>
    <div id="comments"></div>
    <h4>添加评论</h4>
    <form id="commentForm">
        <input type="text" id="nickname" placeholder="昵称" required>
        <input type="url" id="avatar" placeholder="头像 URL (可选)">
        <textarea id="comment" placeholder="你的评论" required></textarea>
        <button type="submit">提交评论</button>
    </form>
</div>

<script>
    (async function() {
        const commentSection = document.getElementById('comment-section');

        // 提交评论的事件处理
        document.getElementById('commentForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const nickname = document.getElementById('nickname').value;
            const avatar = document.getElementById('avatar').value;
            const comment = document.getElementById('comment').value;

            await fetch('https://pinglun.laotuger.workers.dev', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname, avatar, comment }),
            });

            document.getElementById('commentForm').reset();
            loadComments();
        });

        // 加载评论的函数
        async function loadComments() {
            const response = await fetch('https://pinglun.laotuger.workers.dev');
            const comments = await response.json();

            const commentsDiv = document.getElementById('comments');
            commentsDiv.innerHTML = '';

            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                const date = new Date(comment.timestamp);
                const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Shanghai' };
                const formattedDate = date.toLocaleString('zh-CN', options);

                commentDiv.innerHTML = `
                    <img src="${comment.avatar}" alt="${comment.nickname}" style="width: 50px; height: 50px;">
                    <strong>${comment.nickname}</strong>
                    <p>${comment.comment}</p>
                    <small>发布时间: ${formattedDate}</small>
                `;
                commentsDiv.appendChild(commentDiv);
            });
        }

        loadComments();
    })();
</script>
