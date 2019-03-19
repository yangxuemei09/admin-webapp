import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const IsLoadNodesKey = 'isLoadNodes'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getIsLoadNodes() {
  return Cookies.get(IsLoadNodesKey)
}

export function setIsLoadNodes(isLoadNodes) {
  return Cookies.set(IsLoadNodesKey, isLoadNodes)
}

export function removeIsLoadNodes() {
  return Cookies.remove(IsLoadNodesKey)
}
