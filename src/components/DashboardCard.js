import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DashboardCard({ title, subtitle, accent, onPress, buttonText }) {
  return (
    <TouchableOpacity style={[styles.card, { borderColor: accent }]} onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
        {buttonText ? (
          <View style={styles.buttonWrap}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0b1220',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.35)',
  },
  title: { color: '#fff', fontSize: 16, fontWeight: '700' },
  sub: { color: '#b8c1d3', marginTop: 6 },
  buttonWrap: {
    marginTop: 10,
    backgroundColor: '#00E5FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#071224',
    fontWeight: '700',
  },
});