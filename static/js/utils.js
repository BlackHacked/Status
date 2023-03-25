function get(id) {
	return document.getElementById(id)
}

function getClasses(name) {
	return document.getElementsByClassName(name)
}

function set(id, value) {
	return get(id).innerText = value
}

function s(number) {
	if (number !== 1) return "s"
	return ""
}

Array.prototype.max = function() {
	return Math.max.apply(null, this)
}

Array.prototype.min = function() {
	return Math.min.apply(null, this)
}

function parseSize(value, unit="") {
	let addon = "K"
	let r_value = Math.round(value)
	if (r_value >= 1000) {
		addon = "M"
		value /= 1000
		r_value = Math.round(r_value / 1000)
	}
	if (r_value >= 1000) {
		addon = "G"
		value /= 1000
		r_value = Math.round(r_value / 1000)
	}
	if (r_value >= 1000) {
		addon = "T"
		value /= 1000
		r_value = Math.round(r_value / 1000)
	}
	let fixd = 0
	let ferst = value.toFixed(2).split(".")[0].length
	if (ferst == 1) fixd = 2
	else if (ferst == 2) fixd = 1
	value = value.toFixed(fixd)
	if (!unit) unit = addon = ""
	return `${value} ${addon}${unit}`
}

function mkTime(seconds) {
	seconds = Math.round(seconds)
	let m = Math.floor(seconds / 60) % 60
	let h = Math.floor(seconds / 60 / 60) % 24
	let d = Math.floor(seconds / 60 / 60 / 24)
	let nice = ""
	if (d) nice += `${d} day${s(d)} `
	if (h) nice += `${h} hour${s(h)} `
	if (m) nice += `${m} minute${s(m)} `
	if (nice == "") nice = "Booted just now"
	return nice
}

function strToArray(str) {
	if (typeof(str) == "string") str = [str]
	else if (typeof(str) != "object") str = []
	return str
}

function mkDiv(args) {
	let div = document.createElement("div")
	if (args.id) div.id = args.id
	if (args.className) div.className = args.className
	if (args.text) {
		if (args.raw_html) div.innerHTML = args.text
		else div.innerText = args.text
	}
	return div;
}

function mkItem(target, id, icon, name, values) {
	values = strToArray(values)
	if (values == []) return;
	id = `${target}-${id}`
	if (!get(id)) {
		let _target = get(target)
		let _item = mkDiv({className: "item", id})
		let _icon = mkDiv({className: "icon", text: icon})
		let _text = mkDiv({className: "text"})
		let _name = mkDiv({className: "name", text: name})
		_text.appendChild(_name)
		for (let val of values) {
			_text.appendChild(mkDiv({className: "value", text: val}))
		}
		_item.appendChild(_icon)
		_item.appendChild(_text)
		_target.appendChild(_item)
	}
	else {
		let divs = get(id).getElementsByClassName("value")
		for (let i = 0; i < divs.length; i++) {
			divs[i].innerText = values[i]
		}
	}
}