const reverse = require("../utils/for_testing").reverse;

test("a reverse of a", () => {
	const result = reverse("a");
	expect(result).toBe("a");
});

test("a reverse of react", () => {
	const result = reverse("react");
	expect(result).toBe("tcaer");
});

test("a reverse of releveler", () => {
	const result = reverse("releveler");
	expect(result).toBe("releveler");
});
