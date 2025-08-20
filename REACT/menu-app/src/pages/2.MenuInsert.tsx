export default function MenuInsert() {
    return (
        <>
            <div className="menu-test">
                <h4>메뉴 추가(POST)</h4>
            </div>
            <form action="http://localhost:8081/api/menus/new" method="post">
                식당명: <input type="text" name="restaurant" />
                메뉴명: <input type="text" name="name" />
            </form>
        </>
    )
}